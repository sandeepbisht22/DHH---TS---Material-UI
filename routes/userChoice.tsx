import { Router } from "express";
import { userChoiceModel } from "../models/UserChoices.mjs";
import { rapperModel } from "../models/Rappers.mjs";
import { songModel } from "../models/Songs.mjs";
import { beatProducerModel } from "../models/BeatProducer.mjs";
import { authMiddleware } from "../middleware/auth.mjs";

const userChoiceRouter = Router();

const modals = new Map([
  ["favrapper", rapperModel],
  ["favbeatproducer", beatProducerModel],
  ["favsong", songModel],
  ["likedSong", songModel],
  ["dislikedSong", songModel],
]);
/**
 * @route    GET api/userchoice/:id/:choice
 * @param    id is id of song, rapper or beatproducer and choice will be key of model modals
 * @desc     Get information about info of various info like fav rapper, likesong, dislikesong..etc based on id and choice made
 * @access   Public
 */
userChoiceRouter.get("/:id/:choice", [], async (req, res) => {
  console.log(
    "[ userChoice ] Entering to fetch user choice info favourite rapper"
  );
  try {
    const currModal = modals.get(req.params.choice);
    const action = req.params.choice;
    var value = 1;
    var query = {};
    query[action] = value;
    const choiceRes = await userChoiceModel
      .find({ user: req.params.id }, query)
      .lean();
    const actionList = choiceRes[0][action];
    let actionDataList = [];
    for (var i = 0; i < actionList.length; i++) {
      console.log(i + actionList[i]);
      const actionInfo = await currModal.find({
        _id: actionList[i].toString(),
      });
      actionDataList[i] = actionInfo[0]._doc;
    }
    // console.log("length is " + actionDataList);
    res.json(actionDataList);
    console.log("[userChoice] response send for fav rapper");
  } catch (error) {
    console.log(
      "[ userChoice ] Error while fetching data from database for user choice of favourite rapper" +
        error
    );
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * @route    POST api/userchoice/add/:choice/:id/
 * @param    id is id of song, rapper or beatproducer and choice will be key of model modals
 * @desc     Will add document to database with new fav rapper, likesong, dislikesong..etc based on id and choice made
 * @access   Private
 */
userChoiceRouter.post("/add/:choice/:id/", authMiddleware, async (req, res) => {
  const query = {};
  const currModal = modals.get(req.params.choice);

  const field = req.params.choice;
  const value = req.params.id;
  query[field] = value;
  const isChoicePresent = await userChoiceModel.find(query).lean();
  if (isChoicePresent.length === 0) {
    await userChoiceModel
      .updateOne({ user: req.user.id }, { $push: query })
      .lean();
  }
  const actionInfo = await currModal.findOne({
    _id: req.params.id,
  });
  res.json(actionInfo);
});

/**
 * @route    POST api/userchoice/remove/:choice/:id/
 * @param    id is id of song, rapper or beatproducer and choice will be key of model modals
 * @desc     Will remove id document from database with new fav rapper, likesong, dislikesong..etc based on id and choice made
 * @access   Private
 */

userChoiceRouter.post(
  "/remove/:choice/:id/",
  authMiddleware,
  async (req, res) => {
    const query = {};
    const currModal = modals.get(req.params.choice);

    const field = req.params.choice;
    const value = req.params.id;
    query[field] = value;
    const isChoicePresent = await userChoiceModel.find(query).lean();
    if (isChoicePresent.length === 0) {
      await userChoiceModel
        .updateOne({ user: req.user.id }, { $pull: query })
        .lean();
    }
    const actionInfo = await currModal.findOne({
      _id: req.params.id,
    });
    res.json(actionInfo);
  }
);

/**
 * @route    POST api/userchoice/likedartist/:artistValue/:action/:id
 * @param    id is id of rapper or beatproducer and action will tell about the inc or dec of like and artist value decide weather rapper or beatproducer
 * @desc     Will update the artist as liked for user on database
 * @access   Private
 */

userChoiceRouter.post(
  "/likedartist/:artistValue/:action/:id",
  authMiddleware,
  async (req, res) => {
    if (req.params.action === "add") {
      await userChoiceModel.update(
        { user: req.user.id },
        { $push: { [req.params.artistValue]: req.params.id } }
      );
    } else {
      await userChoiceModel.update(
        { user: req.user.id },
        {
          $pull: { [req.params.artistValue]: req.params.id },
        }
      );
    }
  }
);

/**
 * @route    POST api/userchoice/dislikedartist/:action/:id
 * @param    id is id of rapper or beatproducer and action will tell about the inc or dec of like and artist value decide weather rapper or beatproducer
 * @desc     Will update database as disliked artist for the current user
 * @access   Private
 */

userChoiceRouter.post(
  "/dislikedartist/:action/:id",
  authMiddleware,
  async (req, res) => {
    if (req.params.action === "add") {
      await userChoiceModel.update(
        { user: req.user.id },
        { $push: { dislikedrapper: req.params.id } }
      );
    } else {
      await userChoiceModel.update(
        { user: req.user.id },
        {
          $pull: { dislikedrapper: req.params.id },
        }
      );
    }
    res.json("");
  }
);

/**
 * @route    POST api/userchoice/likecheck/:likeaction/:artistid
 * @param    artistid is id rapper or beatproducer and likeaction whether its already liked or disliked
 * @desc     Will check if current artist is liked by the user or not
 * @access   Public
 */

userChoiceRouter.get(
  "/likecheck/:likeaction/:artistid",
  authMiddleware,
  async (req, res) => {
    const isLikedInfo = await userChoiceModel
      .findOne({ [req.params.likeaction]: req.params.artistid })
      .lean();
    if (isLikedInfo !== null) {
      res.json({ res: "true" });
    } else {
      res.json({ res: "false" });
    }
  }
);

/**
 * @route    POST api/userchoice/allFavSongs
 * @param
 * @desc     Will all fav rappers for the current users
 * @access   Private
 */

userChoiceRouter.post("/allFavSongs", authMiddleware, async (req, res) => {
  let favSongs = await userChoiceModel.find(
    { user: req.user.id },
    { favsong: 1 }
  );
  favSongs = favSongs[0]._doc["favsong"];
  let favSongList = [];
  for (var i = 0; i < favSongs.length; i++) {
    console.log(i + favSongs[i]);
    const actionInfo = await songModel.find({
      _id: favSongs[i].toString(),
    });
    favSongList[i] = actionInfo[0]._doc;
  }

  res.json(favSongList);
});
export { userChoiceRouter };

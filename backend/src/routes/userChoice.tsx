import { Router, Request, Response } from "express";
import { userChoiceModel } from "../models/UserChoices";
import { rapperModel } from "../models/Rappers";
import { songModel } from "../models/Songs";
import { beatProducerModel } from "../models/BeatProducer";
import { authMiddleware } from "../middleware/auth";
import { IGetUserAuthInfoRequest } from "./../middleware/auth";
import mongoose, { model } from "mongoose";
import { SongInterface } from "./../models/Songs";
import { ArtistInterface } from "./../models/Rappers";

const userChoiceRouter = Router();

interface queryInterface {
  action: string;
  value: number;
}
const modals = new Map<
  string,
  | mongoose.Model<SongInterface, {}, {}, {}>
  | mongoose.Model<ArtistInterface, {}, {}, {}>
>([
  ["favsong", songModel],
  ["likedSong", songModel],
  ["dislikedSong", songModel],
  ["favrapper", rapperModel],
  ["favbeatproducer", beatProducerModel],
]);

/**
 * @route    GET api/userchoice/:id/:choice
 * @param    id is id of song, rapper or beatproducer and choice will be key of model modals
 * @desc     Get information about info of various info like fav rapper, likesong, dislikesong..etc based on id and choice made
 * @access   Public
 */
userChoiceRouter.get(
  "/:id/:choice",
  [],
  async (req: Request, res: Response) => {
    console.log(
      "[ userChoice ] Entering to fetch user choice info favourite rapper"
    );
    try {
      const currModal = modals.get(req.params.choice);
      var query: queryInterface = { action: "", value: 0 };
      query.action = req.params.choice;
      query.value = 1;
      const choiceRes = await userChoiceModel
        .find(
          { user: new mongoose.Schema.Types.ObjectId(req.params.id) },
          query
        )
        .lean();
      const actionList = choiceRes[0][query.action];
      let actionDataList = [];
      for (var i = 0; i < actionList.length; i++) {
        console.log(i + actionList[i]);
        const actionInfo = await currModal?.findOne({
          _id: new mongoose.Schema.Types.ObjectId(actionList[i].toString()),
        });
        actionDataList[i] = actionInfo[0]._doc;
      }
      // console.log("length is " + actionDataList);
      res.json(actionDataList);
      console.log("[userChoice] response send for fav rapper");
    } catch (error: any) {
      console.log(
        "[ userChoice ] Error while fetching data from database for user choice of favourite rapper" +
          error
      );
      res.status(500).json({ msg: "Server error" });
    }
  }
);

/**
 * @route    POST api/userchoice/add/:choice/:id/
 * @param    id is id of song, rapper or beatproducer and choice will be key of model modals
 * @desc     Will add document to database with new fav rapper, likesong, dislikesong..etc based on id and choice made
 * @access   Private
 */
userChoiceRouter.post(
  "/add/:choice/:id/",
  authMiddleware,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const currModal = modals.get(req.params.choice);
    var query: queryInterface = { action: "", value: 0 };
    query.action = req.params.choice;
    query.value = 1;
    const isChoicePresent = await userChoiceModel.find(query).lean();
    if (isChoicePresent.length === 0) {
      await userChoiceModel
        .updateOne(
          {
            user: new mongoose.Schema.Types.ObjectId(req?.user?.id as string),
          },
          { $push: query }
        )
        .lean();
    }
    const actionInfo = await currModal?.findOne({
      _id: req.params.id,
    });
    res.json(actionInfo);
  }
);

/**
 * @route    POST api/userchoice/remove/:choice/:id/
 * @param    id is id of song, rapper or beatproducer and choice will be key of model modals
 * @desc     Will remove id document from database with new fav rapper, likesong, dislikesong..etc based on id and choice made
 * @access   Private
 */

userChoiceRouter.post(
  "/remove/:choice/:id/",
  authMiddleware,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const currModal = modals.get(req.params.choice);

    var query: queryInterface = { action: "", value: 0 };
    query.action = req.params.choice;
    query.value = 1;
    const isChoicePresent = await userChoiceModel.find(query).lean();
    if (isChoicePresent.length === 0) {
      await userChoiceModel
        .updateOne(
          {
            user: [new mongoose.Schema.Types.ObjectId(req?.user?.id as string)],
          },
          { $pull: query }
        )
        .lean();
    }
    const actionInfo = await currModal?.findOne({
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
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    if (req.params.action === "add") {
      await userChoiceModel.updateOne(
        {
          user: new mongoose.Schema.Types.ObjectId(req?.user?.id as string),
        },
        { $push: { [req.params.artistValue]: req.params.id } }
      );
    } else {
      await userChoiceModel.updateOne(
        {
          user: new mongoose.Schema.Types.ObjectId(req?.user?.id as string),
        },
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
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    if (req.params.action === "add") {
      await userChoiceModel.updateOne(
        {
          user: new mongoose.Schema.Types.ObjectId(req?.user?.id as string),
        },
        { $push: { dislikedrapper: req.params.id } }
      );
    } else {
      await userChoiceModel.updateOne(
        {
          user: new mongoose.Schema.Types.ObjectId(req?.user?.id as string),
        },
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
  async (req: Request, res: Response) => {
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

userChoiceRouter.post(
  "/allFavSongs",
  authMiddleware,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    let favSongs = await userChoiceModel
      .find(
        {
          user: [new mongoose.Schema.Types.ObjectId(req?.user?.id as string)],
        },
        { favsong: 1 }
      )
      .lean();
    // favSongs = favSongs[0]._doc["favsong"];
    // let favSongList = [];
    // for (var i = 0; i < favSongs.length; i++) {
    //   const actionInfo = await songModel.find({
    //     _id: favSongs[i].toString(),
    //   });
    //   favSongList[i] = actionInfo[0]._doc;
    // }
    console.log(JSON.stringify(favSongs));
    // res.json(favSongList);
  }
);
export default userChoiceRouter;

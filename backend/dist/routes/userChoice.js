var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { userChoiceModel } from "../models/UserChoices";
import { rapperModel } from "../models/Rappers";
import { songModel } from "../models/Songs";
import { beatProducerModel } from "../models/BeatProducer";
import { authMiddleware } from "../middleware/auth";
import mongoose from "mongoose";
const userChoiceRouter = Router();
function convert(strVal) {
    switch (strVal) {
        case "likedrapper":
            return "favrapper";
        case "favrapper":
            return "dislikedrapper";
        case "dislikedrapper":
            return "favbeatproducer";
        case "favbeatproducer":
            return "favbeatproducer";
        case "likedbeatproducer":
            return "likedbeatproducer";
        case "dislikedbeatproducer":
            return "dislikedbeatproducer";
        case "favsong":
            return "favsong";
        case "likedSong":
            return "likedSong";
        case "dislikedSong":
            return "dislikedSong";
        default:
            throw new Error("Unsupported type");
    }
}
// interface queryInterface {
//   action: string;
//   value: number;
// }
const modals = new Map([
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
userChoiceRouter.get("/:id/:choice", [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[ userChoice ] Entering to fetch user choice info favourite rapper");
    try {
        const currModal = modals.get(req.params.choice);
        var query = {};
        query[req.params.choice] = 1;
        const choiceRes = yield userChoiceModel
            .find({ user: new mongoose.Types.ObjectId(req.params.id) }, query)
            .lean()
            .populate(req.params.choice)
            .exec();
        const actionList = choiceRes[0][convert(req.params.choice)];
        res.json(actionList);
        console.log("[userChoice] response send for fav rapper");
    }
    catch (error) {
        console.log("[ userChoice ] Error while fetching data from database for user choice of favourite rapper" +
            error);
        res.status(500).json({ msg: "Server error" });
    }
}));
/**
 * @route    POST api/userchoice/allFavSongs
 * @param
 * @desc     Will all fav rappers for the current users
 * @access   Private
 */
userChoiceRouter.post("/allFavSongs", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let favSongsArray = yield userChoiceModel
        .find({
        user: new mongoose.Types.ObjectId((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id),
    }, { favsong: 1 })
        .lean()
        .exec();
    const favSongs = favSongsArray[0]["favsong"];
    let favSongList = [];
    for (var i = 0; i < favSongs.length; i++) {
        const actionInfo = yield songModel.find({
            _id: favSongs[i].toString(),
        });
        favSongList[i] = actionInfo[0];
    }
    console.log(JSON.stringify(favSongs));
    // res.json(favSongList);
}));
/**
 * @route    POST api/userchoice/add/:choice/:id/
 * @param    id is id of song, rapper or beatproducer and choice will be key of model modals
 * @desc     Will add document to database with new fav rapper, likesong, dislikesong..etc based on id and choice made
 * @access   Private
 */
userChoiceRouter.post("/add/:choice/:id/", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const currModal = modals.get(req.params.choice);
    var query = {};
    query[req.params.choice] = 1;
    const isChoicePresent = yield userChoiceModel.find(query).lean();
    if (isChoicePresent.length === 0) {
        yield userChoiceModel
            .updateOne({
            user: new mongoose.Types.ObjectId((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id),
        }, { $push: query })
            .lean()
            .exec();
    }
    const actionInfo = yield (currModal === null || currModal === void 0 ? void 0 : currModal.findOne({
        _id: req.params.id,
    }));
    res.json(actionInfo);
}));
/**
 * @route    POST api/userchoice/remove/:choice/:id/
 * @param    id is id of song, rapper or beatproducer and choice will be key of model modals
 * @desc     Will remove id document from database with new fav rapper, likesong, dislikesong..etc based on id and choice made
 * @access   Private
 */
userChoiceRouter.post("/remove/:choice/:id/", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const currModal = modals.get(req.params.choice);
    var query = {};
    query[req.params.choice] = 1;
    const isChoicePresent = yield userChoiceModel.find(query).lean();
    if (isChoicePresent.length === 0) {
        yield userChoiceModel
            .updateOne({
            user: [new mongoose.Types.ObjectId((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.id)],
        }, { $pull: query })
            .lean()
            .exec();
    }
    const actionInfo = yield (currModal === null || currModal === void 0 ? void 0 : currModal.findOne({
        _id: req.params.id,
    }));
    res.json(actionInfo);
}));
/**
 * @route    POST api/userchoice/likedartist/:artistValue/:action/:id
 * @param    id is id of rapper or beatproducer and action will tell about the inc or dec of like and artist value decide weather rapper or beatproducer
 * @desc     Will update the artist as liked for user on database
 * @access   Private
 */
userChoiceRouter.post("/likedartist/:artistValue/:action/:id", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    if (req.params.action === "add") {
        yield userChoiceModel.updateOne({
            user: new mongoose.Types.ObjectId((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.id),
        }, { $push: { [req.params.artistValue]: req.params.id } });
    }
    else {
        yield userChoiceModel.updateOne({
            user: new mongoose.Types.ObjectId((_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.id),
        }, {
            $pull: { [req.params.artistValue]: req.params.id },
        });
    }
}));
/**
 * @route    POST api/userchoice/dislikedartist/:action/:id
 * @param    id is id of rapper or beatproducer and action will tell about the inc or dec of like and artist value decide weather rapper or beatproducer
 * @desc     Will update database as disliked artist for the current user
 * @access   Private
 */
userChoiceRouter.post("/dislikedartist/:action/:id", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    if (req.params.action === "add") {
        yield userChoiceModel.updateOne({
            user: new mongoose.Types.ObjectId((_f = req === null || req === void 0 ? void 0 : req.user) === null || _f === void 0 ? void 0 : _f.id),
        }, { $push: { dislikedrapper: req.params.id } });
    }
    else {
        yield userChoiceModel.updateOne({
            user: new mongoose.Types.ObjectId((_g = req === null || req === void 0 ? void 0 : req.user) === null || _g === void 0 ? void 0 : _g.id),
        }, {
            $pull: { dislikedrapper: req.params.id },
        });
    }
    res.json("");
}));
/**
 * @route    POST api/userchoice/likecheck/:likeaction/:artistid
 * @param    artistid is id rapper or beatproducer and likeaction whether its already liked or disliked
 * @desc     Will check if current artist is liked by the user or not
 * @access   Public
 */
userChoiceRouter.get("/likecheck/:likeaction/:artistid", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isLikedInfo = yield userChoiceModel
        .findOne({ [req.params.likeaction]: req.params.artistid })
        .lean()
        .exec();
    if (isLikedInfo !== null) {
        res.json({ res: "true" });
    }
    else {
        res.json({ res: "false" });
    }
}));
export default userChoiceRouter;

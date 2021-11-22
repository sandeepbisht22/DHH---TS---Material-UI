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
import { songModel } from "../models/Songs";
import { authMiddleware } from "../middleware/auth";
import { userChoiceModel } from "../models/UserChoices";
import mongoose from "mongoose";
const songRouter = Router();
/**
 * @route    GET /song/:artistType/:id
 * @param    artistType as in rapper or beatproducer, id of the artist
 * @desc     get all songs by the following artist id
 * @access   Public
 */
songRouter.get("/:artistType/:id", [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check for all the songs with artist id provided.
        let songs;
        if (req.params.artistType === "rappers") {
            songs = yield songModel
                .find({
                rapper: new mongoose.Schema.Types.ObjectId(req.params.id),
            })
                .lean();
        }
        else {
            songs = yield songModel
                .find({
                beatproducer: new mongoose.Schema.Types.ObjectId(req.params.id),
            })
                .lean();
        }
        res.json(songs);
    }
    catch (error) {
        console.log("[song] Eror while fetching user due to exception " + error.message);
        res.status(500).json({
            msg: "internal server error",
        });
    }
}));
/**
 * @route    GET /song/likeSong/:songId
 * @param    songId, id of the songs
 * @desc     will add provided song id as the liked song of the logged in user
 * @access   Private
 */
songRouter.post("/likeSong/:songId", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //like only if not present in like
    var _a;
    const isLiked = yield userChoiceModel
        .findOne({
        likedSong: new mongoose.Schema.Types.ObjectId(req.params.songId),
    })
        .lean();
    if (isLiked === null) {
        yield songModel.updateOne({ _id: req.params.songId }, { $inc: { like: 1 } });
    }
    const isDisliked = yield userChoiceModel
        .findOne({
        dislikedSong: new mongoose.Schema.Types.ObjectId(req.params.songId),
    })
        .lean();
    if (isDisliked !== null) {
        //remove from dislike user choice
        yield userChoiceModel
            .updateOne({
            user: new mongoose.Types.ObjectId((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
        }, {
            $pull: {
                dislikedSong: req.params.songId,
            },
        })
            .lean();
        //decrease unlike count
        yield songModel.updateOne({ _id: req.params.songId }, { $inc: { dislike: -1 } });
    }
    const songInfo = yield songModel.findOne({
        _id: req.params.songId,
    });
    res.json(songInfo);
    // res.json(songInfo._doc);
}));
/**
 * @route    GET /song/dislikeSong/:songId
 * @param    songId, id of the songs
 * @desc     will add provided song id as the disliked song of the logged in user
 * @access   Public
 */
songRouter.post("/dislikeSong/:songId", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    //dislike only if not present in like
    const isDisliked = yield userChoiceModel
        .findOne({
        dislikedSong: new mongoose.Schema.Types.ObjectId(req.params.songId),
    })
        .lean();
    if (isDisliked === null) {
        yield songModel.updateOne({ _id: req.params.songId }, { $inc: { dislike: 1 } });
    }
    const isLiked = yield userChoiceModel
        .findOne({
        likedSong: new mongoose.Schema.Types.ObjectId(req.params.songId),
    })
        .lean();
    if (isLiked !== null) {
        //remove from like user choice
        yield userChoiceModel
            .updateOne({
            user: new mongoose.Types.ObjectId((_b = req.user) === null || _b === void 0 ? void 0 : _b.id),
        }, {
            $pull: {
                likedSong: req.params.songId,
            },
        })
            .lean();
        //decrease unlike count
        yield songModel.updateOne({ _id: req.params.songId }, { $inc: { like: -1 } });
    }
    const songInfo = yield songModel.findOne({
        _id: req.params.songId,
    });
    res.json(songInfo);
    // res.json(songInfo._doc);
}));
export default songRouter;

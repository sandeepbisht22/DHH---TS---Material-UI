import { Router, Request, Response } from "express";

import { songModel } from "../models/Songs";
import { authMiddleware } from "../middleware/auth";
import { userChoiceModel } from "../models/UserChoices";
import { IGetUserAuthInfoRequest } from "./../middleware/auth";
import { SongInterface } from "../models/Songs";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { UserChoiceInterface } from "./../models/UserChoices";
const songRouter = Router();

/**
 * @route    GET /song/:artistType/:id
 * @param    artistType as in rapper or beatproducer, id of the artist
 * @desc     get all songs by the following artist id
 * @access   Public
 */

songRouter.get("/:artistType/:id", [], async (req: Request, res: Response) => {
  try {
    //check for all the songs with artist id provided.
    let songs: SongInterface;
    if (req.params.artistType === "rappers") {
      songs = await songModel
        .find({
          rapper: new mongoose.Types.ObjectId(req.params.id),
        })
        .lean();
    } else {
      songs = await songModel
        .find({
          beatproducer: new mongoose.Types.ObjectId(req.params.id),
        })
        .lean();
    }

    res.json(songs);
  } catch (error: any) {
    console.log(
      "[song] Eror while fetching user due to exception " + error.message
    );
    res.status(500).json({
      msg: "internal server error",
    });
  }
});

/**
 * @route    GET /song/likeSong/:songId
 * @param    songId, id of the songs
 * @desc     will add provided song id as the liked song of the logged in user
 * @access   Private
 */
songRouter.post(
  "/likeSong/:songId",
  authMiddleware,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    //like only if not present in like

    const isLiked: UserChoiceInterface = await userChoiceModel
      .findOne({
        likedSong: new mongoose.Types.ObjectId(req.params.songId),
      })
      .lean();

    if (isLiked === null) {
      await songModel.updateOne(
        { _id: req.params.songId },
        { $inc: { like: 1 } }
      );
    }

    const isDisliked = await userChoiceModel
      .findOne({
        dislikedSong: new mongoose.Types.ObjectId(req.params.songId),
      })
      .lean();
    if (isDisliked !== null) {
      //remove from dislike user choice
      await userChoiceModel
        .updateOne(
          {
            user: new mongoose.Types.ObjectId(req.user?.id as string),
          },
          {
            $pull: {
              dislikedSong: req.params.songId,
            },
          }
        )
        .lean();
      //decrease unlike count
      await songModel.updateOne(
        { _id: req.params.songId },
        { $inc: { dislike: -1 } }
      );
    }
    const songInfo: SongInterface | null = await songModel.findOne({
      _id: req.params.songId,
    });
    res.json(songInfo);

    // res.json(songInfo._doc);
  }
);

/**
 * @route    GET /song/dislikeSong/:songId
 * @param    songId, id of the songs
 * @desc     will add provided song id as the disliked song of the logged in user
 * @access   Public
 */

songRouter.post(
  "/dislikeSong/:songId",
  authMiddleware,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    //dislike only if not present in like
    const isDisliked = await userChoiceModel
      .findOne({
        dislikedSong: new mongoose.Types.ObjectId(req.params.songId),
      })
      .lean();
    if (isDisliked === null) {
      await songModel.updateOne(
        { _id: req.params.songId },
        { $inc: { dislike: 1 } }
      );
    }

    const isLiked = await userChoiceModel
      .findOne({
        likedSong: new mongoose.Types.ObjectId(req.params.songId),
      })
      .lean();
    if (isLiked !== null) {
      //remove from like user choice
      await userChoiceModel
        .updateOne(
          {
            user: new mongoose.Types.ObjectId(req.user?.id as string),
          },
          {
            $pull: {
              likedSong: req.params.songId,
            },
          }
        )
        .lean();
      //decrease unlike count
      await songModel.updateOne(
        { _id: req.params.songId },
        { $inc: { like: -1 } }
      );
    }
    const songInfo: SongInterface | null = await songModel.findOne({
      _id: req.params.songId,
    });
    res.json(songInfo);

    // res.json(songInfo._doc);
  }
);

export default songRouter;

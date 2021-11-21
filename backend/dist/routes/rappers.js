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
import { rapperModel } from "../models/Rappers";
const rapperRouter = Router();
import { body, validationResult } from "express-validator";
/***
 * @route Get artist/rappers
 * @description Will GET information of all the rappers with given title ID
 */
rapperRouter.get("/title/:title", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("[Process start] Will fetch Rappers info for rappers with title " +
            req.params.title);
        const rappers = yield rapperModel.find({ title: req.params.title }).exec();
        res.json(rappers);
        console.log("[Success] Rappers info sent to front end");
    }
    catch (error) {
        console.error("[Error] Not able to fetch rappers details" + error.message);
        res.status(500).json({ msg: "Server error" });
    }
}));
/***
 * @route Get artist/rappers/:name
 * @description Will GET information of single rapper based on provided name
 */
rapperRouter.get("/name/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("[Process start] Will fetch Rappers info for rappers with name" +
            req.params.name);
        const rapperInfo = yield rapperModel.find({ name: req.params.name });
        res.json(rapperInfo);
        console.log("[Success] Rappers " + req.params.name + " info sent to front end");
    }
    catch (error) {
        console.error("[Error] Not able to fetch rappers details" + error.message);
        res.status(500).json({ msg: "Server error" });
    }
}));
/**
 * @route /artist/rappers/:name
 * @description Will like and unlike rappers based on input  of id in body
 */
rapperRouter.post("/rate/:likeUnlike", [body("id", "Its not alphaNumeric").isAlphanumeric()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("reached likeUnlike");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                msg: "error while checking body values",
            });
        }
        const likeUnlike = req.params.likeUnlike;
        let likeUnlikeVal = null;
        const { id, action } = req.body;
        if (action === "inc") {
            likeUnlikeVal = 1;
        }
        else {
            likeUnlikeVal = -1;
        }
        console.log("id is" + id);
        if (likeUnlike === "like") {
            yield rapperModel.update({ _id: id }, { $inc: { like: likeUnlikeVal } });
        }
        else {
            yield rapperModel.update({ _id: id }, { $inc: { unLike: likeUnlikeVal } });
        }
        // console.log("updating like of the artist" + JSON.stringify(likeInfo));
        res.json("");
    }
    catch (error) { }
}));
export default rapperRouter;

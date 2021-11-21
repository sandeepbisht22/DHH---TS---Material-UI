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
import { beatProducerModel } from "../models/BeatProducer";
import { body, validationResult } from "express-validator";
const beatProducerRouter = Router();
/**
 * @route /artist/beatProdcuer
 * @description Will Get information about all the beat producers
 */
beatProducerRouter.get("/title/:title", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("[Process start] Will fetch Beat Producers info for rappers with title " +
            req.params.title);
        //in future will fetch based on the title
        const beatProducer = yield beatProducerModel.find({
            title: req.params.title,
        });
        res.json(beatProducer);
        console.log("[Sucess] Beat Producer data fetched and send to front end");
    }
    catch (error) {
        console.log("[Error] while fetching beat producer info due to error -" + error);
        res.status(500).json({ msg: "Server Error" });
    }
}));
/**
 * @route /artist/beatProdcuer/:name
 * @description Will Get information about single beat producers based on name
 */
beatProducerRouter.get("/name/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("[Process start] Will fetch Beat Producers info for rappers with name" +
            req.params.name);
        const rapperInfo = yield beatProducerModel.find({ name: req.params.name });
        res.json(rapperInfo);
        console.log("[Success] Beat Producers " + req.params.name + " info sent to front end");
    }
    catch (error) {
        console.error("[Error] Not able to fetch Beat Producers details" + error.message);
        res.status(500).json({ msg: "Server error" });
    }
}));
/**
 * @route /artist/beatProdcuer/:name
 * @description Will like and unlike beatproducer based on input  of id in body
 */
beatProducerRouter.post("/rate/:likeUnlike", [body("id", "Its not alphaNumeric").isAlphanumeric()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            yield beatProducerModel.update({ _id: id }, { $inc: { like: likeUnlikeVal } });
        }
        else {
            yield beatProducerModel.update({ _id: id }, { $inc: { unLike: likeUnlikeVal } });
        }
        // console.log("updating like of the artist" + JSON.stringify(likeInfo));
        res.json("");
    }
    catch (error) { }
}));
export default beatProducerRouter;

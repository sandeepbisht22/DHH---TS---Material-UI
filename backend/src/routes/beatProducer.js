"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var BeatProducer_1 = require("../models/BeatProducer");
var express_validator_1 = require("express-validator");
var beatProducerRouter = (0, express_1.Router)();
/**
 * @route /artist/beatProdcuer
 * @description Will Get information about all the beat producers
 */
beatProducerRouter.get("/title/:title", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var beatProducer, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("[Process start] Will fetch Beat Producers info for rappers with title " +
                    req.params.title);
                return [4 /*yield*/, BeatProducer_1.beatProducerModel.find({
                        title: req.params.title
                    })];
            case 1:
                beatProducer = _a.sent();
                res.json(beatProducer);
                console.log("[Sucess] Beat Producer data fetched and send to front end");
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log("[Error] while fetching beat producer info due to error -" + error_1);
                res.status(500).json({ msg: "Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @route /artist/beatProdcuer/:name
 * @description Will Get information about single beat producers based on name
 */
beatProducerRouter.get("/name/:name", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rapperInfo, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("[Process start] Will fetch Beat Producers info for rappers with name" +
                    req.params.name);
                return [4 /*yield*/, BeatProducer_1.beatProducerModel.find({ name: req.params.name })];
            case 1:
                rapperInfo = _a.sent();
                res.json(rapperInfo);
                console.log("[Success] Beat Producers " + req.params.name + " info sent to front end");
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("[Error] Not able to fetch Beat Producers details" + error_2.message);
                res.status(500).json({ msg: "Server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @route /artist/beatProdcuer/:name
 * @description Will like and unlike beatproducer based on input  of id in body
 */
beatProducerRouter.post("/rate/:likeUnlike", [(0, express_validator_1.body)("id", "Its not alphaNumeric").isAlphanumeric()], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, likeUnlike, likeUnlikeVal, _a, id, action, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                console.log("reached likeUnlike");
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({
                            errors: errors.array(),
                            msg: "error while checking body values"
                        })];
                }
                likeUnlike = req.params.likeUnlike;
                likeUnlikeVal = null;
                _a = req.body, id = _a.id, action = _a.action;
                if (action === "inc") {
                    likeUnlikeVal = 1;
                }
                else {
                    likeUnlikeVal = -1;
                }
                console.log("id is" + id);
                if (!(likeUnlike === "like")) return [3 /*break*/, 2];
                return [4 /*yield*/, BeatProducer_1.beatProducerModel.update({ _id: id }, { $inc: { like: likeUnlikeVal } })];
            case 1:
                _b.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, BeatProducer_1.beatProducerModel.update({ _id: id }, { $inc: { unLike: likeUnlikeVal } })];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                // console.log("updating like of the artist" + JSON.stringify(likeInfo));
                res.json("");
                return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports["default"] = beatProducerRouter;

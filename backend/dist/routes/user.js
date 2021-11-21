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
import { body, validationResult } from "express-validator";
import { userModel } from "../models/User";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
const userRouter = Router();
/**
 * @route    POST /user
 * @param
 * @desc      Regiter a user
 * @access   Public
 */
userRouter.post("/", [
    body("name", "Please add a name").not().isEmpty(),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password is required").exists(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            msg: "error while checking body values",
        });
    }
    //1. Destructure req into params
    const { name, password, email, phoneno } = req.body;
    //2. Check if user is present on database
    let user = yield userModel.findOne({ email: email });
    if (user) {
        return res.status(400).json({ msg: "user already exist" });
    }
    user = new userModel({
        name,
        email,
        phoneno,
        password,
    });
    //3. decrypt data and send it to client
    const salt = yield bycrypt.genSalt(10);
    user.password = yield bycrypt.hash(password, salt);
    //4. Save on database
    yield user.save();
    //5.send response
    const payload = {
        user: {
            id: user.id,
        },
    };
    jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 36000 }, (error, token) => {
        if (error)
            throw error;
        res.json({ token });
    });
}));
/**
 * @route    GET /user/:email
 * @param    email of the user
 * @desc     Will check if already exist
 * @access   Public
 */
userRouter.get("/:email", [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield userModel.findOne({ email: req.params.email });
    if (user) {
        const payload = {
            user: {
                id: user.id,
            },
        };
        console.log("user found with id" + user.id);
        jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 36000 }, (error, token) => {
            if (error)
                throw error;
            res.json({ token });
        });
    }
    else {
        return res.status(400).json({ msg: "user already exist" });
    }
}));
export default userRouter;

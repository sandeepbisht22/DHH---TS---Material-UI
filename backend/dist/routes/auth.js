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
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import { authMiddleware } from "../middleware/auth";
const authRouter = Router();
/**
 * @route    POST /auth
 * @param
 * @desc     will check if its a valid credentials to login and return token
 * @access   Public
 */
authRouter.post("/", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter valid length").exists(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = yield userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        const isMatch = yield bycrpt.compare(password, user.password);
        console.log("Is match " + isMatch);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password" });
        }
        const payload = {
            user: {
                id: user.id,
            },
        };
        console.log("Sending to client");
        jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 36000 }, (error, token) => {
            if (error)
                throw error;
            res.json({ token });
        });
    }
    catch (error) {
        console.error("Error while authenticating user due to error " + error.message);
        res.status(500).json({ msg: "Server Error" });
    }
}));
/**
 * @route    POST /auth
 * @param
 * @desc     will get user info based on token input
 * @access   Private
 */
authRouter.get("/", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield userModel.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).select("-password");
        res.json(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
}));
export default authRouter;

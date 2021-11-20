import { Router } from "express";
import { body, validationResult } from "express-validator";
import { userModel } from "../models/User.mjs";
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
userRouter.post(
  "/",
  [
    body("name", "Please add a name").not().isEmpty(),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
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
    let user = await userModel.findOne({ email: email });
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
    const salt = await bycrypt.genSalt(10);
    user.password = await bycrypt.hash(password, salt);
    //4. Save on database
    await user.save();
    //5.send response
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 36000 },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  }
);

/**
 * @route    GET /user/:email
 * @param    email of the user
 * @desc     Will check if already exist
 * @access   Public
 */
userRouter.get("/:email", [], async (req, res) => {
  let user = await userModel.findOne({ email: req.params.email });
  if (user) {
    const payload = {
      user: {
        id: user.id,
      },
    };
    console.log("user found with id" + user.id);
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 36000 },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } else {
    return res.status(400).json({ msg: "user already exist" });
  }
});
export { userRouter };

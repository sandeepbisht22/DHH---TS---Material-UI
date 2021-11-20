import { Router } from "express";
import { body, validationResult } from "express-validator";
import { userModel } from "../models/User.mjs";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import { authMiddleware } from "../middleware/auth.mjs";

const authRouter = Router();

/**
 * @route    POST /auth
 * @param
 * @desc     will check if its a valid credentials to login and return token
 * @access   Public
 */
authRouter.post(
  "/",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter valid length").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
      }

      const isMatch = await bycrpt.compare(password, user.password);
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

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(
        "Error while authenticating user due to error " + error.message
      );
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

/**
 * @route    POST /auth
 * @param
 * @desc     will get user info based on token input
 * @access   Private
 */

authRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

export { authRouter };

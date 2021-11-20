import express from "express";
import { connectMongoDB } from "./config/db.mjs";
import { rapperRouter } from "./routes/rappers.mjs";
import { beatProducerRouter } from "./routes/beatProducer.mjs";
import { userRouter } from "./routes/user.mjs";
import { authRouter } from "./routes/auth.mjs";
import { songRouter } from "./routes/song.mjs";
import { userChoiceRouter } from "./routes/userChoice.mjs";

const app = express();

// Making DB connection
connectMongoDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    msg: "DHH is here",
  });
});
const PORT = process.env.PORT || 5000;

app.use("/artist/rappers", rapperRouter);
app.use("/artist/beatProducers", beatProducerRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/song", songRouter);
app.use("/userchoice", userChoiceRouter);
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

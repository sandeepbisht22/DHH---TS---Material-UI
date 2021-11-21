import express from "express";
import rapperRouter from "./routes/rappers";
import beatProducerRouter from "./routes/beatProducer";
import userRouter from "./routes/user";
import authRouter from "./routes/auth";
import songRouter from "./routes/song";
import userChoiceRouter from "./routes/userChoice";
import connectMongoDB from "./config/db";
const app = express();
// Making DB connection
connectMongoDB();
app.use(express.json({ strict: false }));
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

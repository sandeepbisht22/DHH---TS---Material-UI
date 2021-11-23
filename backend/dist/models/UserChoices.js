import mongoose from "mongoose";
const userChoiceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    favrapper: [{ type: mongoose.Schema.Types.ObjectId, ref: "rapper" }],
    likedrapper: [{ type: mongoose.Schema.Types.ObjectId, ref: "rapper" }],
    dislikedrapper: [{ type: mongoose.Schema.Types.ObjectId, ref: "rapper" }],
    favbeatproducer: [
        { type: mongoose.Schema.Types.ObjectId, ref: "beatproducer" },
    ],
    likedbeatproducer: [
        { type: mongoose.Schema.Types.ObjectId, ref: "beatproducer" },
    ],
    dislikedbeatproducer: [
        { type: mongoose.Schema.Types.ObjectId, ref: "beatproducer" },
    ],
    favsong: [{ type: mongoose.Schema.Types.ObjectId, ref: "song" }],
    likedSong: [{ type: mongoose.Schema.Types.ObjectId, ref: "song" }],
    dislikedSong: [{ type: mongoose.Schema.Types.ObjectId, ref: "song" }],
});
const userChoiceModel = mongoose.model("userchoice", userChoiceSchema);
export { userChoiceModel };

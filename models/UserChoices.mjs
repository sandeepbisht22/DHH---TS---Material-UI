import mongoose from "mongoose";

const userChoiceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  favrapper: [{ type: mongoose.Schema.Types.ObjectId, ref: "rappers" }],
  likedrapper: [{ type: mongoose.Schema.Types.ObjectId, ref: "rappers" }],
  dislikedrapper: [{ type: mongoose.Schema.Types.ObjectId, ref: "rappers" }],
  favbeatproducer: [
    { type: mongoose.Schema.Types.ObjectId, ref: "beatproducers" },
  ],
  likedbeatproducer: [
    { type: mongoose.Schema.Types.ObjectId, ref: "beatproducers" },
  ],
  dislikedbeatproducer: [
    { type: mongoose.Schema.Types.ObjectId, ref: "beatproducers" },
  ],
  favsong: [{ type: mongoose.Schema.Types.ObjectId, ref: "songs" }],
  likedSong: [{ type: mongoose.Schema.Types.ObjectId, ref: "songs" }],
  dislikedSong: [{ type: mongoose.Schema.Types.ObjectId, ref: "songs" }],
});

const userChoiceModel = mongoose.model("userchoice", userChoiceSchema);

export { userChoiceModel };

import mongoose from "mongoose";

export interface UserChoiceInterface {
  user: mongoose.Types.ObjectId;
  likedrapper: [mongoose.Schema.Types.ObjectId];
  favrapper: [mongoose.Schema.Types.ObjectId];
  dislikedrapper: [mongoose.Schema.Types.ObjectId];
  favbeatproducer: [mongoose.Schema.Types.ObjectId];
  likedbeatproducer: [mongoose.Schema.Types.ObjectId];
  dislikedbeatproducer: [mongoose.Schema.Types.ObjectId];
  favsong: [mongoose.Schema.Types.ObjectId];
  likedSong: [mongoose.Schema.Types.ObjectId];
  dislikedSong: [mongoose.Schema.Types.ObjectId];
}
const userChoiceSchema = new mongoose.Schema<UserChoiceInterface>({
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

const userChoiceModel = mongoose.model<UserChoiceInterface>(
  "userchoice",
  userChoiceSchema
);

export { userChoiceModel };

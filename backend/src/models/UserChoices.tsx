import mongoose from "mongoose";
import { ArtistInterface } from "./Rappers";
import { SongInterface } from "./Songs";

export interface UserChoiceInterface extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  likedrapper: [ArtistInterface["_id"]];
  favrapper: [ArtistInterface["_id"]];
  dislikedrapper: [ArtistInterface["_id"]];
  favbeatproducer: [ArtistInterface["_id"]];
  likedbeatproducer: [ArtistInterface["_id"]];
  dislikedbeatproducer: [ArtistInterface["_id"]];
  favsong: [SongInterface["_id"]];
  likedSong: [SongInterface["_id"]];
  dislikedSong: [SongInterface["_id"]];
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

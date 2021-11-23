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

const userChoiceModel = mongoose.model<UserChoiceInterface>(
  "userchoice",
  userChoiceSchema
);

export { userChoiceModel };

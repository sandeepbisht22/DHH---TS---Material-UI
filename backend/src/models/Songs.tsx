import mongoose from "mongoose";
import { ArtistInterface } from "./Rappers";

export interface SongInterface extends mongoose.Document {
  name: string;
  rapper: ArtistInterface["_id"];
  beatproducer: ArtistInterface["_id"];
  songlinks?: string;
  like?: string;
  dislike?: string;
}

const songSchema = new mongoose.Schema<SongInterface>({
  name: {
    type: String,
    required: true,
  },
  rapper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rappers",
  },
  beatproducer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "beatproducers",
  },
  songlinks: {
    type: Array,
  },
  like: {
    type: Number,
  },
  dislike: {
    type: Number,
  },
});

const songModel = mongoose.model<SongInterface>("song", songSchema);

export { songModel };

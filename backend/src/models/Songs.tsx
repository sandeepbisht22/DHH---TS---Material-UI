import mongoose from "mongoose";
export interface SongInterface {
  name: string;
  rapper: mongoose.Schema.Types.ObjectId;
  beatproducer: mongoose.Schema.Types.ObjectId;
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

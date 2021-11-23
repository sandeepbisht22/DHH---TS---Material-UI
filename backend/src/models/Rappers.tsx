import mongoose from "mongoose";

export interface ArtistInterface extends mongoose.Document {
  name: string;
  title: string;
  about: string;
  sociallinks: Array<string>;
  originalName: string;
  profileImage: string;
  like?: string;
  unLike?: string;
  date?: Date;
}
const rapperSchema = new mongoose.Schema<ArtistInterface>({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  sociallinks: {
    type: [String],
    required: true,
  },
  originalName: {
    type: String,
  },
  profileImage: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
  },
  unLike: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const rapperModel = mongoose.model<ArtistInterface>("rapper", rapperSchema);

export { rapperModel };

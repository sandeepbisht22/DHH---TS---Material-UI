import mongoose from "mongoose";
const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rapper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rapper",
    },
    beatproducer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "beatproducer",
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
const songModel = mongoose.model("song", songSchema);
export { songModel };

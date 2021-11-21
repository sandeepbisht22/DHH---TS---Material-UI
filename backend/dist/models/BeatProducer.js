import mongoose from "mongoose";
const beatProducerSchema = new mongoose.Schema({
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
const beatProducerModel = mongoose.model("beatProducer", beatProducerSchema);
export { beatProducerModel };

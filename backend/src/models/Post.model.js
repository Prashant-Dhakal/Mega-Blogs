import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        lowerCase: true,
        unique: true,
    },
    image: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
    }
} , {timestamps: true})

export const Post = mongoose.model("Post", postSchema);
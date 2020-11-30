const mongoose = require("mongoose")

const { Schema, model, Types } = mongoose

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    image: {
        type: String
    }, 
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })


const Post = model("Post", postSchema)

module.exports = Post
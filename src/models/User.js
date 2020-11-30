const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const { Schema, model } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, "User already exist"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png"
    },
    admin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

const User = model("User", userSchema)

module.exports = User
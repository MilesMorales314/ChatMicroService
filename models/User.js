import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        validation: (val) => ((val !== null) && (val.trim().length > 3))
    },
    password: {
        type: String,
        required: true,
        validation: (val) => ((val !== null) && (!!val.trim()))
    },
    profilePicture: {
        type: String
    },
    onlineStatus: {
        type: Boolean,
        default: false
    },
    lastSeen: {
        type: Date
    }
})

export default mongoose.model("User", userSchema);
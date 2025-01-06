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
    }
})

export default mongoose.model(userSchema);
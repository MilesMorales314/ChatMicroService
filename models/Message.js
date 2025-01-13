import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    messageId: {
        type: String,
        unique: true
    },
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ['individual', 'group'],
        required: true
    },
    attachments: {
        type: Array,
        default: []
    } // Optional: file URLs or metadata
  });

export default mongoose.model("Message", messageSchema);
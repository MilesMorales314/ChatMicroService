import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
    roomId: {
        type: String,
        unique: true
    },
    roomType: {
        type: String,
        enum: ['user', 'group'],
        required: true
    },
    participants: [{ type: String }], // User IDs
    lastSeen: {
        type: Map,
        of: Date
    }, // Tracks last seen timestamps per user
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }] // Message references
  });

export default mongoose.model("Message", roomSchema);
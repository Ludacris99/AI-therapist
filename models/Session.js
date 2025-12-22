import { Schema, models, model  } from "mongoose";

const SessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User", // Links to existing User model
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }, //auto-delete expired sessions
    },
});

export default models.Session || model("Session", SessionSchema);
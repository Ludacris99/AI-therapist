import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Important: Check if the model exists before creating a new one
const User = models.User || model('User', UserSchema);
export default User;
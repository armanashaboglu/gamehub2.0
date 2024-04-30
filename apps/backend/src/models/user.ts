import mongoose, { Schema, model, Document } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String, required: true },
    bio: { type: String, required: false },
});

interface IUser extends Document {
    username: string;
    password: string;
    bio: string;
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;
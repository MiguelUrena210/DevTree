import mongoose, { Schema } from "mongoose";

interface IUser {
    handle: string,
    name:string
    email: string
    password: string
}

const userSchema = new Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

const User = mongoose.model<IUser>('User',userSchema);
export default User;
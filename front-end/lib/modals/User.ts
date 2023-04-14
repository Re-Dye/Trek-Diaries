import mongoose from "mongoose";

interface User {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    dob: Date,
    profile_pic: any
}

const Schema = mongoose.Schema

const userSchema = new Schema<User>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 30,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    profile_pic: {
        data: Buffer,
        contentType: String,
    }
})

export default userSchema;
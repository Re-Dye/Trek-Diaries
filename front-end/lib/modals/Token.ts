import mongoose, { Schema } from "mongoose";
interface IToken {
    token: string;
    createdAt: Date;
}

const tokenSchema = new Schema<IToken>({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600
    }
},{collection: 'Tokens'})

const Token = mongoose.models.Token||mongoose.model("Token",tokenSchema);
export default Token;
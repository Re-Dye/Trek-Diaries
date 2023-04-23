import mongoose from "mongoose"

interface IToken {
    userId: {
        type: Schema.Types.ObjectId,
        ref: string,
    };
    token: string;
    createdAt: Date;
}

const Schema = mongoose.Schema

const tokenSchema = new Schema<IToken>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true
    },
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
import mongoose, { Schema } from "mongoose";

interface IComment {
    content: string;
    owner: {
        type: Schema.Types.ObjectId;
        ref: string;
    }
}

interface IPost {
    description: string;
    picture: any;
    likes: number;
    comments: [IComment];
    owner:  {
        type: Schema.Types.ObjectId;
        ref: string;
    }
}

const commentSchema = new Schema<IComment>({
    content: {
        type: String,
        required: true,
        maxlength: 150,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

const postSchema = new Schema<IPost>({
    description: {
        type: String,
        maxlength: 150
    },
    picture: {
        data: Buffer,
        contentType: String
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [commentSchema],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

const Post = mongoose.models.Post||mongoose.model("Post", postSchema);
export default Post;
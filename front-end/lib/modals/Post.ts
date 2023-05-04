import mongoose, { Schema } from "mongoose";

interface IComment {
  content: string;
  owner: string;
  registeredTime: mongoose.Schema.Types.Date;
}
interface Ilocation {
  id: Schema.Types.ObjectId;
  address: string;
}
interface IOwner {
  email: string,
  name: string
}

interface IPost {
  description: string;
  picture: any;
  location: Ilocation;
  likes: number;
  comments: [IComment];
  owner: IOwner;
  registeredTime: mongoose.Schema.Types.Date;
}



const commentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
    maxlength: 150,
  },
  owner: {
    type: String
  },
  registeredTime: {
    required: true,
    type: mongoose.Schema.Types.Date,
    default: new Date()
  }
});

const postSchema = new Schema<IPost>({
  description: {
    type: String,
    maxlength: 150,
  },
  pictureURL: {
    type: String, 
  },
  location: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "location",
    },
    address: {
      type: String,
    },
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema],
  owner: {
    email: {
      type: String,
    },
    name: {
      type: String,
    }
  },
  registeredTime: {
    required: true,
    type: mongoose.Schema.Types.Date,
    default: new Date()
  }

});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;

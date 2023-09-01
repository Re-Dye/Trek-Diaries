import mongoose, { Schema } from "mongoose";

interface IComment {
  id: Schema.Types.ObjectId;
  content: string;
  owner: string;
  registeredTime: mongoose.Schema.Types.Date;
}
interface Ilocation {
  id: Schema.Types.ObjectId;
  address: string;
}
interface IOwner {
  email: string;
  name: string;
}

interface IRating{
  TrailCondition: number;
  Weather: number;
  Accessibility: number;
  overallScore: number;
}

interface IPost {
  description: string;
  pictureURL: string;
  location: Ilocation;
  likes: number;
  likedBy: [string];
  comments: [IComment];
  owner: IOwner;
  rating: IRating;
  registeredTime: mongoose.Schema.Types.Date;
}



const commentSchema = new Schema<IComment>({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 1500,
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
    maxlength: 1500,
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
  likedBy: [{
    type: String,
  }],

  comments: [commentSchema],
  owner: {
    email: {
      type: String,
    },
    name: {
      type: String,
    }
  },

  rating: {
    TrailCondition: {
      type: Number,
    },
    Weather: {
      type: Number,
    },
    Accessibility: {
      type: Number,
    },
    overallScore: {
      type: Number,
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

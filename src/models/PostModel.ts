import mongoose from "mongoose";
import User from "./UserModel";

const postSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: User,
    },
    post: {
      type: String,
    },
    tag: {
      type: String,
    },
    likes: [
      {
        creatorID: {
          type: mongoose.Schema.ObjectId,
          ref: User,
        },
        likerID: {
          type: mongoose.Schema.ObjectId,
          ref: User,
        },
      },
    ],
  },
  { timestamps: true }
);

const Posts = mongoose.models.Posts || mongoose.model("Posts", postSchema);
export default Posts;

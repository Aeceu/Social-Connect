import mongoose from "mongoose";
import User from "./UserModel";
import Posts from "./PostModel";

const commentsSchema = new mongoose.Schema(
  {
    creatorID: {
      type: mongoose.Schema.ObjectId,
      ref: User,
    },
    postID: {
      type: mongoose.Schema.ObjectId,
      ref: Posts,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comments =
  mongoose.models.Comments || mongoose.model("Comments", commentsSchema);
export default Comments;

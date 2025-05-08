import mongoose from "mongoose";

const CATEGORIES = [
  "Tech",
  "Photography",
  "Designing",
  "Drawing",
  "Music",
  "Writing",
  "Gaming",
  "Travel",
  "Food",
  "Lifestyle",
  "Other",
];

const postSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    imageUrl: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    category: {
      type: String,
      required: [true, "Post category is required"],
      enum: CATEGORIES,
      default: "Other",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;

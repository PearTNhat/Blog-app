import { Schema, Model, model } from "mongoose";
const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    desc: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true }, // comment o post nao
    checked: { type: Boolean, default: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
    replyOnUser: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

CommentSchema.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentId",
});

const Comment = model("Comment", CommentSchema);
export default Comment;

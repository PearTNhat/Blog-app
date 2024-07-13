import { Schema, Model, model } from "mongoose";
const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    body: { type: Object, required: true },
    photo: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    verified: { type: Boolean, default: true },
    tags: { type: [String], required: false },
    categories: {
      type: [Schema.Types.ObjectId],
      ref: "PostCategories",
      default: [],
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
// như kiểu 1 post có nhiều comment
PostSchema.virtual("comments", {
  // virtual populate , sẻ có attribute comments trong Post ( phải dùng toJSON: { virtuals: true } mới có comments)
  // mục đích là ta muốn dùng id post để lấy các comment của post đó
  ref: "Comment",
  localField: "_id",
  // tim _id(Post) == post (Comment) để đưa vào attr comments trong Post
  foreignField: "post",
});

const Post = model("Post", PostSchema);
export default Post;

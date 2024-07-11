"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var PostSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  body: {
    type: Object,
    required: true
  },
  photo: {
    type: String,
    required: false
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  verified: {
    type: Boolean,
    "default": false
  },
  tags: {
    type: [String],
    required: false
  },
  categories: {
    type: [_mongoose.Schema.Types.ObjectId],
    ref: "PostCategories",
    "default": []
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});
PostSchema.virtual("comments", {
  // virtual populate , sẻ có attribute comments trong Post ( phải dùng toJSON: { virtuals: true } mới có comments)
  // mục đích là ta muốn dùng id post để lấy các comment của post đó
  ref: "Comment",
  localField: "_id",
  // tim _id(Post) == post (Comment) để đưa vào attr comments trong Post
  foreignField: "post"
});
var Post = (0, _mongoose.model)("Post", PostSchema);
var _default = exports["default"] = Post;
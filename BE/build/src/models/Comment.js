"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var CommentSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  post: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  // comment o post nao
  checked: {
    type: Boolean,
    "default": true
  },
  parentId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    "default": null
  },
  replyOnUser: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    "default": null
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});
CommentSchema.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentId"
});
var Comment = (0, _mongoose.model)("Comment", CommentSchema);
var _default = exports["default"] = Comment;
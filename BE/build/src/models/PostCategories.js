"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var PostCategoriesSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var PostCategories = (0, _mongoose.model)("PostCategories", PostCategoriesSchema);
var _default = exports["default"] = PostCategories;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API = void 0;
var _express = _interopRequireDefault(require("express"));
var _userRoute = require("./userRoute");
var _postRoute = require("./postRoute");
var _commentRoute = require("./commentRoute");
var _postCategoriesRoute = require("./postCategoriesRoute");
var Router = _express["default"].Router();
Router.use("/users", _userRoute.userRoute);
Router.use("/posts", _postRoute.postRoute);
Router.use("/comments", _commentRoute.commentRoute);
Router.use("/post-categories", _postCategoriesRoute.categoriesRoute);
var API = exports.API = Router;
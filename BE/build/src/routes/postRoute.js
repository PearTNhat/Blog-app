"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _postController = require("../controllers/postController");
var _authMiddleware = require("../middleware/authMiddleware");
var Router = _express["default"].Router();
Router.route("/").get(_postController.getAllPosts).post(_authMiddleware.authGuard, _authMiddleware.adminGuard, _postController.createPost);
Router.route("/:slug").get(_postController.getPost).put(_authMiddleware.authGuard, _authMiddleware.adminGuard, _postController.updatePost)["delete"](_authMiddleware.authGuard, _authMiddleware.adminGuard, _postController.deletePost);
var postRoute = exports.postRoute = Router;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commentRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _commentController = require("../controllers/commentController");
var _authMiddleware = require("../middleware/authMiddleware");
var Router = _express["default"].Router();
Router.route("/").post(_authMiddleware.authGuard, _commentController.createComment).get(_authMiddleware.authGuard, _authMiddleware.adminGuard, _commentController.getAllComments);
Router.route("/:commentId").put(_authMiddleware.authGuard, _commentController.updateComment)["delete"](_authMiddleware.authGuard, _commentController.deleteComment);
var commentRoute = exports.commentRoute = Router;
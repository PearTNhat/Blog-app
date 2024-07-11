"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController");
var _authMiddleware = require("../middleware/authMiddleware");
var Router = _express["default"].Router();
Router.route("/register").post(_userController.register);
Router.route("/login").post(_userController.loginUser);
Router.route("/forgot-password").post(_userController.forgotPassword);
Router.route("/reset-password/:id/:token").post(_userController.resetPassword);
Router.route("/profile").get(_authMiddleware.authGuard, _userController.userProfile);
Router.route("/updateProfile").put(_authMiddleware.authGuard, _userController.updateProfile);
Router.route("/updateProfilePicture").put(_authMiddleware.authGuard, _userController.updateProfilePicture);
Router.route("/").get(_authMiddleware.authGuard, _authMiddleware.adminGuard, _userController.getAllUsers);
Router.route("/:userId")["delete"](_authMiddleware.authGuard, _authMiddleware.adminGuard, _userController.deleteUser).put(_authMiddleware.authGuard, _authMiddleware.adminGuard, _userController.updateAdminUser);
var userRoute = exports.userRoute = Router;
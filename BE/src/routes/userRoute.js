import express from "express";

import {
  register,
  loginUser,
  forgotPassword,
  resetPassword,
  userProfile,
  updateProfile,
  updateProfilePicture,
  getAllUsers,
  deleteUser,
  updateAdminUser,
} from "~/controllers/userController";
import { adminGuard, authGuard } from "~/middleware/authMiddleware";
const Router = express.Router();

Router.route("/register").post(register);
Router.route("/login").post(loginUser);
Router.route("/forgot-password").post(forgotPassword);
Router.route("/reset-password/:id/:token").post(resetPassword);
Router.route("/profile").get(authGuard, userProfile);
Router.route("/updateProfile").put(authGuard, updateProfile);
Router.route("/updateProfilePicture").put(authGuard, updateProfilePicture);
Router.route("/").get(authGuard, adminGuard, getAllUsers);
Router.route("/:userId")
  .delete(authGuard, adminGuard, deleteUser)
  .put(authGuard, adminGuard, updateAdminUser);
export const userRoute = Router;

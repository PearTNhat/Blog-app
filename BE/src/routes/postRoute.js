import express from "express";

import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} from "~/controllers/postController";
import { authGuard, adminGuard } from "~/middleware/authMiddleware";
const Router = express.Router();

Router.route("/").get(getAllPosts).post(authGuard, adminGuard, createPost);
Router.route("/:slug")
  .get(getPost)
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost);
export const postRoute = Router;

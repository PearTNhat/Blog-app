import express from "express";

import {
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
} from "~/controllers/commentController";
import { authGuard, adminGuard } from "~/middleware/authMiddleware";
const Router = express.Router();

Router.route("/")
  .post(authGuard, createComment)
  .get(authGuard, adminGuard, getAllComments);

Router.route("/:commentId")
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment);

export const commentRoute = Router;

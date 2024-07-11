import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "~/controllers/postCategoriesController";

import { authGuard, adminGuard } from "~/middleware/authMiddleware";
const Router = express.Router();

Router.route("/")
  .post(authGuard, adminGuard, createCategory)
  .get(getAllCategories);
Router.route("/:categoryId")
  .get(getSingleCategory)
  .put(authGuard, adminGuard, updateCategory)
  .delete(authGuard, adminGuard, deleteCategory);

export const categoriesRoute = Router;

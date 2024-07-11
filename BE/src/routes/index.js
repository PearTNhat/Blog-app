import express from "express";
import { userRoute } from "./userRoute";
import { postRoute } from "./postRoute";
import { commentRoute } from "./commentRoute";
import { categoriesRoute } from "./postCategoriesRoute";
const Router = express.Router();

Router.use("/users", userRoute);
Router.use("/posts", postRoute);
Router.use("/comments", commentRoute);
Router.use("/post-categories", categoriesRoute);
export const API = Router;

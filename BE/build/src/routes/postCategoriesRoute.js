"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _postCategoriesController = require("../controllers/postCategoriesController");
var _authMiddleware = require("../middleware/authMiddleware");
var Router = _express["default"].Router();
Router.route("/").post(_authMiddleware.authGuard, _authMiddleware.adminGuard, _postCategoriesController.createCategory).get(_postCategoriesController.getAllCategories);
Router.route("/:categoryId").get(_postCategoriesController.getSingleCategory).put(_authMiddleware.authGuard, _authMiddleware.adminGuard, _postCategoriesController.updateCategory)["delete"](_authMiddleware.authGuard, _authMiddleware.adminGuard, _postCategoriesController.deleteCategory);
var categoriesRoute = exports.categoriesRoute = Router;
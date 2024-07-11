"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCategory = exports.getSingleCategory = exports.getAllCategories = exports.deleteCategory = exports.createCategory = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Post = _interopRequireDefault(require("../models/Post"));
var _PostCategories = _interopRequireDefault(require("../models/PostCategories"));
var createCategory = exports.createCategory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var title, category, error, newCategory, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          title = req.body.title;
          title = title.trim();
          _context.next = 5;
          return _PostCategories["default"].findOne({
            title: title
          });
        case 5:
          category = _context.sent;
          if (!category) {
            _context.next = 10;
            break;
          }
          error = new Error("Category already exists");
          next(error);
          return _context.abrupt("return");
        case 10:
          newCategory = new _PostCategories["default"]({
            title: title
          });
          _context.next = 13;
          return newCategory.save();
        case 13:
          result = _context.sent;
          res.status(201).json(result);
          _context.next = 20;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function createCategory(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getAllCategories = exports.getAllCategories = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var filter, where, query, page, limit, total, pages, skip, posts;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          filter = req.query.search;
          where = {};
          if (filter) {
            where.title = {
              $regex: filter,
              $options: "i"
            };
          }
          query = _PostCategories["default"].find(where);
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          _context2.next = 9;
          return _PostCategories["default"].find(where).countDocuments();
        case 9:
          total = _context2.sent;
          pages = Math.ceil(total / limit);
          skip = (page - 1) * limit;
          res.header({
            "x-filter": filter,
            "x-current-page": JSON.stringify(page),
            "x-pages-size": JSON.stringify(limit),
            "x-total-count": JSON.stringify(total),
            "x-total-page-count": JSON.stringify(pages)
          });
          if (page > pages || page < 1) {
            res.json([]);
          }
          _context2.next = 16;
          return query.skip(skip).limit(limit).sort({
            createdAt: "desc"
          });
        case 16:
          posts = _context2.sent;
          res.status(200).json(posts);
          _context2.next = 23;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 20]]);
  }));
  return function getAllCategories(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var getSingleCategory = exports.getSingleCategory = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var categoryId, category;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          categoryId = req.params.categoryId;
          _context3.next = 4;
          return _PostCategories["default"].findById(categoryId);
        case 4:
          category = _context3.sent;
          if (category) {
            _context3.next = 7;
            break;
          }
          throw new Error("Category not found");
        case 7:
          res.status(200).json(category);
          _context3.next = 13;
          break;
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function getSingleCategory(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var updateCategory = exports.updateCategory = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var categoryId, title, category, error;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          categoryId = req.params.categoryId;
          title = req.body.title;
          _context4.next = 5;
          return _PostCategories["default"].findOneAndUpdate({
            _id: categoryId
          }, {
            title: title
          }, {
            "new": true
          });
        case 5:
          category = _context4.sent;
          if (category) {
            _context4.next = 10;
            break;
          }
          error = new Error("Category not found");
          next(error);
          return _context4.abrupt("return");
        case 10:
          res.status(200).json(category);
          _context4.next = 16;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return function updateCategory(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteCategory = exports.deleteCategory = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var categoryId;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          categoryId = req.params.categoryId;
          _context5.next = 4;
          return _PostCategories["default"].deleteOne({
            _id: categoryId
          });
        case 4:
          _context5.next = 6;
          return _Post["default"].updateOne({
            categories: {
              $in: [categoryId]
            }
          }, {
            $pull: {
              categories: categoryId
            }
          });
        case 6:
          res.status(200).json({
            message: "Category deleted successfully"
          });
          _context5.next = 12;
          break;
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function deleteCategory(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
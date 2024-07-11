"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateComment = exports.getAllComments = exports.deleteComment = exports.createComment = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Comment = _interopRequireDefault(require("../models/Comment"));
var _Post = _interopRequireDefault(require("../models/Post"));
var getAllComments = exports.getAllComments = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var filter, where, query, page, limit, total, pages, skip, posts;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          filter = req.query.search;
          where = {};
          if (filter) {
            where.desc = {
              $regex: filter,
              $options: "i"
            };
          }
          query = _Comment["default"].find(where);
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          _context.next = 9;
          return _Comment["default"].find(where).countDocuments();
        case 9:
          total = _context.sent;
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
          _context.next = 16;
          return query.skip(skip).limit(limit).populate([{
            path: "user",
            select: "name avatar verified"
          }, {
            path: "parentId",
            populate: [{
              path: "user",
              select: "name avatar verified"
            }]
          }, {
            path: "replyOnUser",
            select: "name avatar verified"
          }, {
            path: "post",
            select: "slug title"
          }]).sort({
            createdAt: "desc"
          });
        case 16:
          posts = _context.sent;
          res.status(200).json(posts);
          _context.next = 23;
          break;
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 20]]);
  }));
  return function getAllComments(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var createComment = exports.createComment = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, desc, slug, parentId, replyOnUser, post, error, comment, newComment;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, desc = _req$body.desc, slug = _req$body.slug, parentId = _req$body.parentId, replyOnUser = _req$body.replyOnUser;
          _context2.next = 4;
          return _Post["default"].findOne({
            slug: slug
          });
        case 4:
          post = _context2.sent;
          if (post) {
            _context2.next = 8;
            break;
          }
          error = new Error("Post was not found");
          return _context2.abrupt("return", next(error));
        case 8:
          comment = new _Comment["default"]({
            desc: desc,
            slug: slug,
            parentId: parentId,
            replyOnUser: replyOnUser,
            post: post._id,
            user: req.user._id
          });
          _context2.next = 11;
          return comment.save();
        case 11:
          newComment = _context2.sent;
          res.status(200).json({
            message: "Comment created successfully",
            data: newComment
          });
          _context2.next = 18;
          break;
        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 15]]);
  }));
  return function createComment(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var updateComment = exports.updateComment = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _req$body2, desc, check, newComment, error, _error;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body2 = req.body, desc = _req$body2.desc, check = _req$body2.check;
          _context3.next = 4;
          return _Comment["default"].findById(req.params.commentId).populate("user", "name avatar admin");
        case 4:
          newComment = _context3.sent;
          if (newComment) {
            _context3.next = 8;
            break;
          }
          error = new Error("Comment not found");
          return _context3.abrupt("return", next(error));
        case 8:
          if (!(newComment.user.admin && check !== undefined)) {
            _context3.next = 13;
            break;
          }
          newComment.checked = typeof check !== "undefined" ? check : newComment.checked; // tranh truong hop check = undefined vi kh truyền check vào
          _context3.next = 12;
          return newComment.save();
        case 12:
          return _context3.abrupt("return", res.status(200).json({
            message: "Check updated successfully",
            data: newComment
          }));
        case 13:
          if (!(newComment.user._id.toString() !== req.user._id.toString())) {
            _context3.next = 16;
            break;
          }
          _error = new Error("You are not authorized to update this comment");
          return _context3.abrupt("return", next(_error));
        case 16:
          newComment.desc = desc || newComment.desc;
          _context3.next = 19;
          return newComment.save();
        case 19:
          res.status(200).json({
            message: "Comment updated successfully",
            data: newComment
          });
          _context3.next = 25;
          break;
        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 22]]);
  }));
  return function updateComment(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var deleteComment = exports.deleteComment = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var myComment, error, _error2;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Comment["default"].findById(req.params.commentId).populate("user", "name avatar");
        case 3:
          myComment = _context4.sent;
          if (myComment) {
            _context4.next = 7;
            break;
          }
          error = new Error("Comment not found");
          return _context4.abrupt("return", next(error));
        case 7:
          if (!(myComment.user._id.toString() !== req.user._id.toString())) {
            _context4.next = 10;
            break;
          }
          _error2 = new Error("You are not authorized to delete this comment");
          return _context4.abrupt("return", next(_error2));
        case 10:
          _context4.next = 12;
          return _Comment["default"].deleteOne({
            _id: req.params.commentId
          });
        case 12:
          _context4.next = 14;
          return _Comment["default"].deleteMany({
            parentId: myComment._id
          });
        case 14:
          res.status(200).json({
            message: "Comment updated successfully"
          });
          _context4.next = 20;
          break;
        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 20:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 17]]);
  }));
  return function deleteComment(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
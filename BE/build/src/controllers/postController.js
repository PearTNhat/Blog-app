"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePost = exports.getPost = exports.getAllPosts = exports.deletePost = exports.createPost = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _uploadPictureMiddleware = require("../middleware/uploadPictureMiddleware");
var _fileRemover = require("../utils/fileRemover");
var _Post = _interopRequireDefault(require("../models/Post"));
var _Comment = _interopRequireDefault(require("../models/Comment"));
var _uuid = require("uuid");
var _compareInstance = require("../utils/compareInstance");
var createPost = exports.createPost = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var newPost, _createPost;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          newPost = new _Post["default"]({
            user: req.user._id,
            title: req.body.title || "sample title",
            caption: "new caption",
            body: {
              type: "doc",
              content: []
            },
            photo: "",
            slug: (0, _uuid.v4)()
          });
          _context.next = 4;
          return newPost.save();
        case 4:
          _createPost = _context.sent;
          return _context.abrupt("return", res.status(200).json(_createPost));
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function createPost(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var updatePost = exports.updatePost = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var post, error, handleData, handleUpdatePost, upload;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Post["default"].findOne({
            slug: req.params.slug
          });
        case 3:
          post = _context3.sent;
          if (post) {
            _context3.next = 7;
            break;
          }
          error = new Error("Post not found");
          return _context3.abrupt("return", next(error));
        case 7:
          handleData = function handleData(req, res, data) {
            var _req$file;
            if (!data) {
              var _error = Error("Please provide attributes for the post");
              throw _error;
            }
            var _JSON$parse = JSON.parse(data),
              title = _JSON$parse.title,
              caption = _JSON$parse.caption,
              body = _JSON$parse.body,
              tags = _JSON$parse.tags,
              categories = _JSON$parse.categories,
              slug = _JSON$parse.slug;
            var compareTags = (0, _compareInstance.compareTwoArrays)(post.tags, tags);
            var isCategoriesEqual = (0, _compareInstance.compareCategories)(categories, post.categories);
            var compareBody = (0, _compareInstance.compareTwoObjects)(post.body, body);
            if (compareBody && post.photo === ((req === null || req === void 0 || (_req$file = req.file) === null || _req$file === void 0 ? void 0 : _req$file.filename) || "") && compareTags && isCategoriesEqual && post.title === title && post.caption === caption && post.slug === slug) {
              return true;
            }
            return false;
          };
          handleUpdatePost = function handleUpdatePost(data) {
            var _JSON$parse2 = JSON.parse(data),
              title = _JSON$parse2.title,
              caption = _JSON$parse2.caption,
              body = _JSON$parse2.body,
              tags = _JSON$parse2.tags,
              categories = _JSON$parse2.categories,
              slug = _JSON$parse2.slug;
            post.title = title || post.title;
            post.caption = caption || post.caption;
            post.body = body || post.body;
            post.tags = tags || post.tags;
            post.categories = categories || post.categories;
            post.slug = slug || post.slug;
          };
          upload = _uploadPictureMiddleware.uploadPicture.single("postPicture");
          upload(req, res, /*#__PURE__*/function () {
            var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
              var _error2, result, filename, _filename, newPostUpdate;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!err) {
                      _context2.next = 5;
                      break;
                    }
                    _error2 = new Error("An Unknown error occurred when uploading" + " " + err.message);
                    next(_error2);
                    _context2.next = 15;
                    break;
                  case 5:
                    _context2.prev = 5;
                    result = handleData(req, res, req.body.documents);
                    if (!result) {
                      _context2.next = 9;
                      break;
                    }
                    return _context2.abrupt("return", res.status(202).json({
                      message: "Nothing changed",
                      data: post
                    }));
                  case 9:
                    _context2.next = 14;
                    break;
                  case 11:
                    _context2.prev = 11;
                    _context2.t0 = _context2["catch"](5);
                    return _context2.abrupt("return", next(_context2.t0));
                  case 14:
                    if (req.file) {
                      filename = post.photo;
                      if (filename) {
                        (0, _fileRemover.fileRemover)(filename);
                      }
                      post.photo = req.file.filename;
                    } else {
                      _filename = post.photo;
                      post.photo = "";
                      if (_filename) {
                        (0, _fileRemover.fileRemover)(_filename);
                      }
                    }
                  case 15:
                    handleUpdatePost(req.body.documents);
                    _context2.next = 18;
                    return post.save();
                  case 18:
                    newPostUpdate = _context2.sent;
                    console.log("update post");
                    res.status(200).json({
                      message: "Post updated successfully",
                      data: newPostUpdate
                    });
                  case 21:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[5, 11]]);
            }));
            return function (_x7) {
              return _ref3.apply(this, arguments);
            };
          }());
          _context3.next = 16;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return function updatePost(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var deletePost = exports.deletePost = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _post, error;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Post["default"].findOneAndDelete({
            slug: req.params.slug,
            user: req.user._id
          });
        case 3:
          _post = _context4.sent;
          if (!_post) {
            error = new Error("Post not found");
            next(error);
          }
          _context4.next = 7;
          return _Comment["default"].deleteMany({
            post: _post._id
          });
        case 7:
          res.status(200).json({
            message: "Post deleted successfully",
            data: _post
          });
          _context4.next = 12;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function deletePost(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
var getPost = exports.getPost = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var _post2, error;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Post["default"].findOne({
            slug: req.params.slug
          }).populate([{
            path: "user",
            select: "name avatar"
          }, {
            path: "categories",
            select: "title"
          }, {
            path: "comments",
            match: {
              checked: true,
              parentId: null
            },
            populate: [{
              path: "user",
              select: "name avatar"
            }, {
              // lay slug trong main comment
              path: "post",
              select: "slug"
            }, {
              path: "replies",
              match: {
                checked: true
              },
              populate: [{
                path: "user",
                select: "name avatar"
              }, {
                path: "post",
                select: "slug"
              }, {
                path: "replyOnUser",
                select: "name"
              }]
            }]
          }]);
        case 3:
          _post2 = _context5.sent;
          if (_post2) {
            _context5.next = 7;
            break;
          }
          error = new Error("Post not found");
          return _context5.abrupt("return", next(error));
        case 7:
          res.status(200).json({
            message: "Get post successfully",
            data: _post2
          });
          _context5.next = 13;
          break;
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function getPost(_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();
var getAllPosts = exports.getAllPosts = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var filter, where, query, page, limit, total, pages, skip, posts;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          filter = req.query.search;
          where = {};
          if (filter) {
            where.title = {
              $regex: filter,
              $options: "i"
            };
          }
          query = _Post["default"].find(where).populate([{
            path: "categories"
          }]);
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          _context6.next = 9;
          return _Post["default"].find(where).countDocuments();
        case 9:
          total = _context6.sent;
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
          _context6.next = 16;
          return query.skip(skip).limit(limit).populate([{
            path: "user",
            select: "name avatar verified"
          }, {
            path: "categories",
            select: "title"
          }]).sort({
            createdAt: "desc"
          });
        case 16:
          posts = _context6.sent;
          res.status(200).json(posts);
          _context6.next = 23;
          break;
        case 20:
          _context6.prev = 20;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 23:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 20]]);
  }));
  return function getAllPosts(_x14, _x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}();
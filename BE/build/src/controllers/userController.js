"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userProfile = exports.updateProfilePicture = exports.updateProfile = exports.updateAdminUser = exports.resetPassword = exports.register = exports.loginUser = exports.getAllUsers = exports.forgotPassword = exports.deleteUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _uploadPictureMiddleware = require("../middleware/uploadPictureMiddleware");
var _fileRemover = require("../utils/fileRemover");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _jsonwebtoken = require("jsonwebtoken");
var _sendMail = _interopRequireDefault(require("../utils/sendMail"));
require("dotenv/config");
var _Comment = _interopRequireDefault(require("../models/Comment"));
var _User = _interopRequireDefault(require("../models/User"));
var _Post = _interopRequireDefault(require("../models/Post"));
var register = exports.register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, avatar, name, email, password, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, avatar = _req$body.avatar, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return _User["default"].findOne({
            email: email
          });
        case 4:
          user = _context.sent;
          if (!user) {
            _context.next = 7;
            break;
          }
          throw new Error("Email already exists");
        case 7:
          _context.next = 9;
          return _User["default"].create({
            avatar: avatar,
            name: name,
            email: email,
            password: password
          });
        case 9:
          user = _context.sent;
          res.status(201).json({
            message: "Register successfully",
            data: {
              id: user._id,
              avatar: user.avatar,
              name: user.name,
              email: user.email,
              verified: user.verified,
              admin: user.admin,
              token: user.generateToken()
              //  như token = await user.generateToken() nó sẻ chờ cho đến khi user.generateToken() chạy xong thì mới chạy tiếp
            }
          });
          _context.next = 16;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          next(_context.t0);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 13]]);
  }));
  return function register(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var loginUser = exports.loginUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body2, email, password, user, error;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 4;
          return _User["default"].findOne({
            email: email
          });
        case 4:
          user = _context2.sent;
          if (user) {
            _context2.next = 7;
            break;
          }
          throw new Error("Email or password are not exist");
        case 7:
          _context2.next = 9;
          return user.comparePassword(password);
        case 9:
          if (!_context2.sent) {
            _context2.next = 25;
            break;
          }
          _context2.t0 = res.status(200);
          _context2.t1 = user._id;
          _context2.t2 = user.avatar;
          _context2.t3 = user.name;
          _context2.t4 = user.email;
          _context2.t5 = user.verified;
          _context2.t6 = user.admin;
          _context2.next = 19;
          return user.generateToken();
        case 19:
          _context2.t7 = _context2.sent;
          _context2.t8 = {
            id: _context2.t1,
            avatar: _context2.t2,
            name: _context2.t3,
            email: _context2.t4,
            verified: _context2.t5,
            admin: _context2.t6,
            token: _context2.t7
          };
          _context2.t9 = {
            message: "Login successfully",
            data: _context2.t8
          };
          return _context2.abrupt("return", _context2.t0.json.call(_context2.t0, _context2.t9));
        case 25:
          error = new Error("Email or password are not exist");
          error.statusCode = 401;
          throw error;
        case 28:
          _context2.next = 33;
          break;
        case 30:
          _context2.prev = 30;
          _context2.t10 = _context2["catch"](0);
          next(_context2.t10);
        case 33:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 30]]);
  }));
  return function loginUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var forgotPassword = exports.forgotPassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var email, odlUser, error, token, link;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          email = req.body.email;
          _context3.next = 4;
          return _User["default"].findOne({
            email: email
          });
        case 4:
          odlUser = _context3.sent;
          if (odlUser) {
            _context3.next = 9;
            break;
          }
          error = new Error("Email not found");
          error.statusCode = 401;
          throw error;
        case 9:
          _context3.next = 11;
          return odlUser.generateToken({
            email: email
          }, odlUser.password, "2m");
        case 11:
          token = _context3.sent;
          link = "".concat(process.env.FRONTEND_URL, "/reset-password/").concat(odlUser._id, "/").concat(token);
          _context3.next = 15;
          return (0, _sendMail["default"])(email, link);
        case 15:
          res.json({
            message: "Reset password link has been sent to your email"
          });
          _context3.next = 21;
          break;
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function forgotPassword(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var resetPassword = exports.resetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _req$params, id, token, _req$body3, password, confirmPassword, user, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$params = req.params, id = _req$params.id, token = _req$params.token;
          _req$body3 = req.body, password = _req$body3.password, confirmPassword = _req$body3.confirmPassword;
          if (!(password !== confirmPassword)) {
            _context4.next = 5;
            break;
          }
          throw new Error("Password not match with confirm password");
        case 5:
          _context4.next = 7;
          return _User["default"].findById(id);
        case 7:
          user = _context4.sent;
          data = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET + user.password);
          if (!(!user || (user === null || user === void 0 ? void 0 : user.email) !== (data === null || data === void 0 ? void 0 : data.email))) {
            _context4.next = 11;
            break;
          }
          throw new Error("Link reset password is invalid");
        case 11:
          user.password = password;
          _context4.next = 14;
          return user.save();
        case 14:
          _context4.t0 = res.status(200);
          _context4.t1 = user._id;
          _context4.t2 = user.avatar;
          _context4.t3 = user.name;
          _context4.t4 = user.email;
          _context4.t5 = user.verified;
          _context4.t6 = user.admin;
          _context4.next = 23;
          return user.generateToken();
        case 23:
          _context4.t7 = _context4.sent;
          _context4.t8 = {
            id: _context4.t1,
            avatar: _context4.t2,
            name: _context4.t3,
            email: _context4.t4,
            verified: _context4.t5,
            admin: _context4.t6,
            token: _context4.t7
          };
          _context4.t9 = {
            message: "Verified",
            data: _context4.t8
          };
          _context4.t0.json.call(_context4.t0, _context4.t9);
          _context4.next = 32;
          break;
        case 29:
          _context4.prev = 29;
          _context4.t10 = _context4["catch"](0);
          next(_context4.t10);
        case 32:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 29]]);
  }));
  return function resetPassword(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var userProfile = exports.userProfile = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (req.user._id) {
            _context5.next = 3;
            break;
          }
          throw new Error("User not found");
        case 3:
          return _context5.abrupt("return", res.status(200).json({
            id: req.user._id,
            avatar: req.user.avatar,
            name: req.user.name,
            email: req.user.email,
            verified: req.user.verified,
            admin: req.user.admin
          }));
        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 9:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 6]]);
  }));
  return function userProfile(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var updateProfile = exports.updateProfile = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var _req$body4, name, email, password, newPassword, user, updateUserProfile;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body4 = req.body, name = _req$body4.name, email = _req$body4.email, password = _req$body4.password, newPassword = _req$body4.newPassword;
          _context6.next = 4;
          return _User["default"].findById(req.user._id);
        case 4:
          user = _context6.sent;
          if (user) {
            _context6.next = 7;
            break;
          }
          throw new Error("User not found");
        case 7:
          user.name = name || user.name;
          user.email = email || user.email;
          user.password = password || user.password;
          _context6.next = 12;
          return user.save();
        case 12:
          updateUserProfile = _context6.sent;
          res.status(200).json({
            id: updateUserProfile._id,
            avatar: updateUserProfile.avatar,
            name: updateUserProfile.name,
            email: updateUserProfile.email,
            verified: updateUserProfile.verified,
            admin: updateUserProfile.admin
          });
          _context6.next = 19;
          break;
        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 16]]);
  }));
  return function updateProfile(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var updateProfilePicture = exports.updateProfilePicture = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var upload;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          try {
            upload = _uploadPictureMiddleware.uploadPicture.single("profilePicture");
            upload(req, res, /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(err) {
                var error, filename, updateUser, _filename, user;
                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      if (!err) {
                        _context7.next = 5;
                        break;
                      }
                      // đang ở trong function upload nên k cath đc bên ngoài
                      // throw new Error("An Unknown error occurred when uploading"+" "+err.message);
                      error = new Error("An Unknown error occurred when uploading" + " " + err.message);
                      next(error);
                      _context7.next = 47;
                      break;
                    case 5:
                      if (!req.file) {
                        _context7.next = 28;
                        break;
                      }
                      _context7.next = 8;
                      return _User["default"].findById(req.user._id);
                    case 8:
                      updateUser = _context7.sent;
                      filename = updateUser.avatar;
                      if (filename) {
                        (0, _fileRemover.fileRemover)(filename);
                      }
                      updateUser.avatar = req.file.filename;
                      _context7.next = 14;
                      return updateUser.save();
                    case 14:
                      _context7.t0 = res.status(200);
                      _context7.t1 = updateUser._id;
                      _context7.t2 = updateUser.avatar;
                      _context7.t3 = updateUser.name;
                      _context7.t4 = updateUser.email;
                      _context7.t5 = updateUser.verified;
                      _context7.t6 = updateUser.admin;
                      _context7.next = 23;
                      return updateUser.generateToken();
                    case 23:
                      _context7.t7 = _context7.sent;
                      _context7.t8 = {
                        id: _context7.t1,
                        avatar: _context7.t2,
                        name: _context7.t3,
                        email: _context7.t4,
                        verified: _context7.t5,
                        admin: _context7.t6,
                        token: _context7.t7
                      };
                      _context7.t0.json.call(_context7.t0, _context7.t8);
                      _context7.next = 47;
                      break;
                    case 28:
                      _context7.next = 30;
                      return _User["default"].findById(req.user._id);
                    case 30:
                      user = _context7.sent;
                      _filename = user.avatar;
                      user.avatar = "";
                      if (_filename) {
                        (0, _fileRemover.fileRemover)(_filename);
                      }
                      _context7.next = 36;
                      return user.save();
                    case 36:
                      _context7.t9 = res.status(200);
                      _context7.t10 = user._id;
                      _context7.t11 = user.name;
                      _context7.t12 = user.email;
                      _context7.t13 = user.verified;
                      _context7.t14 = user.admin;
                      _context7.next = 44;
                      return user.generateToken();
                    case 44:
                      _context7.t15 = _context7.sent;
                      _context7.t16 = {
                        id: _context7.t10,
                        avatar: "",
                        name: _context7.t11,
                        email: _context7.t12,
                        verified: _context7.t13,
                        admin: _context7.t14,
                        token: _context7.t15
                      };
                      _context7.t9.json.call(_context7.t9, _context7.t16);
                    case 47:
                    case "end":
                      return _context7.stop();
                  }
                }, _callee7);
              }));
              return function (_x22) {
                return _ref8.apply(this, arguments);
              };
            }());
          } catch (error) {
            next(error);
          }
        case 1:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function updateProfilePicture(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var getAllUsers = exports.getAllUsers = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var filter, where, query, page, limit, total, pages, skip, users;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          filter = req.query.search;
          where = {};
          if (filter) {
            where.name = {
              $regex: filter,
              $options: "i"
            };
          }
          query = _User["default"].find(where);
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          _context9.next = 9;
          return _User["default"].find(where).countDocuments();
        case 9:
          total = _context9.sent;
          pages = Math.ceil(total / limit);
          skip = (page - 1) * limit;
          res.header({
            "x-filter": filter,
            "x-current-page": JSON.stringify(page),
            "x-pages-size": JSON.stringify(limit),
            "x-total-count": JSON.stringify(total),
            "x-total-page-count": JSON.stringify(pages)
          });
          if (!(page > pages || page < 1)) {
            _context9.next = 15;
            break;
          }
          return _context9.abrupt("return", res.json([]));
        case 15:
          _context9.next = 17;
          return query.skip(skip).limit(limit).sort({
            createdAt: "desc"
          });
        case 17:
          users = _context9.sent;
          res.status(200).json(users);
          _context9.next = 24;
          break;
        case 21:
          _context9.prev = 21;
          _context9.t0 = _context9["catch"](0);
          next(_context9.t0);
        case 24:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 21]]);
  }));
  return function getAllUsers(_x23, _x24, _x25) {
    return _ref9.apply(this, arguments);
  };
}();
var deleteUser = exports.deleteUser = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var session, userId, user, postToDelete, postIdToDelete;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _mongoose["default"].startSession();
        case 2:
          session = _context10.sent;
          session.startTransaction();
          _context10.prev = 4;
          userId = req.params.userId;
          _context10.next = 8;
          return _User["default"].findById(userId);
        case 8:
          user = _context10.sent;
          if (user) {
            _context10.next = 11;
            break;
          }
          throw new Error("User not found");
        case 11:
          _context10.next = 13;
          return _Post["default"].find({
            user: userId
          });
        case 13:
          postToDelete = _context10.sent;
          postIdToDelete = postToDelete.map(function (post) {
            return post._id;
          });
          _context10.next = 17;
          return _Post["default"].deleteMany({
            user: userId
          });
        case 17:
          _context10.next = 19;
          return _Comment["default"].deleteMany({
            post: {
              $in: postIdToDelete
            }
          });
        case 19:
          _context10.next = 21;
          return _User["default"].deleteOne({
            _id: userId
          });
        case 21:
          _context10.next = 23;
          return session.commitTransaction();
        case 23:
          res.status(200).json("Delete user successfully");
          _context10.next = 31;
          break;
        case 26:
          _context10.prev = 26;
          _context10.t0 = _context10["catch"](4);
          _context10.next = 30;
          return session.abortTransaction();
        case 30:
          next(_context10.t0);
        case 31:
          _context10.prev = 31;
          session.endSession();
          return _context10.finish(31);
        case 34:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[4, 26, 31, 34]]);
  }));
  return function deleteUser(_x26, _x27, _x28) {
    return _ref10.apply(this, arguments);
  };
}();
var updateAdminUser = exports.updateAdminUser = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
    var userId, admin, user;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          if (req.user.admin) {
            _context11.next = 3;
            break;
          }
          throw new Error("You are not admin");
        case 3:
          userId = req.params.userId;
          admin = req.body.admin;
          if (!(userId === req.user._id)) {
            _context11.next = 7;
            break;
          }
          throw new Error("You can't change your role");
        case 7:
          user = findOne({
            _id: userId
          });
          user.admin = typeof admin !== "undefined" ? admin : user.admin;
          _context11.next = 11;
          return user.save();
        case 11:
          res.status(200).json("Update admin successfully");
          _context11.next = 17;
          break;
        case 14:
          _context11.prev = 14;
          _context11.t0 = _context11["catch"](0);
          next(_context11.t0);
        case 17:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 14]]);
  }));
  return function updateAdminUser(_x29, _x30, _x31) {
    return _ref11.apply(this, arguments);
  };
}();
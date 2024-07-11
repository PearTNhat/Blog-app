"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authGuard = exports.adminGuard = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = require("jsonwebtoken");
var _User = _interopRequireDefault(require("../models/User"));
var authGuard = exports.authGuard = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, _verify, id, err, error;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
            _context.next = 17;
            break;
          }
          _context.prev = 1;
          token = req.headers.authorization.split(" ")[1];
          _verify = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET), id = _verify.id;
          _context.next = 6;
          return _User["default"].findById(id).select("-password");
        case 6:
          req.user = _context.sent;
          next();
          _context.next = 15;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          err = new Error("Not authorized ,token failed" + " " + _context.t0.message);
          err.statusCode = 401;
          next(err);
        case 15:
          _context.next = 20;
          break;
        case 17:
          error = new Error("Not authorized , no token");
          error.statusCode = 401;
          next(error);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 10]]);
  }));
  return function authGuard(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var adminGuard = exports.adminGuard = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var error;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (req.user && req.user.admin) {
            next();
          } else {
            error = new Error("Not authorized as an admin");
            error.statusCode = 401;
            next(error);
          }
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function adminGuard(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
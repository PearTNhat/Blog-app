"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = require("mongoose");
var _bcryptjs = require("bcryptjs");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var UserSchema = new _mongoose.Schema({
  avatar: {
    type: String,
    "default": ""
  },
  name: {
    type: String,
    min: 6,
    max: 50,
    required: true
  },
  email: {
    type: String,
    min: 6,
    required: true,
    unique: true
  },
  password: {
    type: String,
    min: 6,
    max: 50,
    required: true
  },
  verified: {
    type: Boolean,
    "default": false
  },
  admin: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
UserSchema.pre("save", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!this.isModified("password")) {
            _context.next = 5;
            break;
          }
          _context.next = 3;
          return (0, _bcryptjs.hash)(this.password, 10);
        case 3:
          this.password = _context.sent;
          next();
        case 5:
          return _context.abrupt("return", next());
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
// tao 1 function generateToken trong UserSchema VD res = UserSchema.create(...) thì có res.generateToken() để tạo token
UserSchema.methods.generateToken = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var securityKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var expiresIn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "30d";
  return _jsonwebtoken["default"].sign(_objectSpread({
    id: this._id
  }, obj), process.env.JWT_SECRET + securityKey, {
    expiresIn: expiresIn
  });
};
UserSchema.methods.comparePassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(enterPassword) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _bcryptjs.compare)(enterPassword, this.password);
        case 2:
          return _context2.abrupt("return", _context2.sent);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var User = (0, _mongoose.model)("User", UserSchema);
var _default = exports["default"] = User;
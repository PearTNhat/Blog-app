"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
require("dotenv/config");
var sendMail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(to, link) {
    var transporter, main, _main;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _main = function _main3() {
            _main = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return transporter.sendMail({
                      from: "Blog Nhật",
                      // sender address
                      to: to,
                      // list of receivers
                      subject: "[Blog Nhật] Please reset your password",
                      // Subject line
                      text: "Click on the link to reset password",
                      // plain text body
                      html: "<!DOCTYPE html>\n      <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title>Document</title>\n      </head>\n      <body>\n        <h1>Reset your blog password</h1>\n        <p>\n          Click the link to reset your password\n          <a href=".concat(link, ">Reset Password</a>\n        </p>\n        <p>The password reset link expires in 2 minutes</p>\n      </body>\n      </html>") // html body
                    });
                  case 2:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return _main.apply(this, arguments);
          };
          main = function _main2() {
            return _main.apply(this, arguments);
          };
          console.log("to", to);
          transporter = _nodemailer["default"].createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
            }
          }); // async..await is not allowed in global scope, must use a wrapper
          try {} catch (error) {}
          _context2.prev = 5;
          _context2.next = 8;
          return main();
        case 8:
          console.log("send mail success");
          _context2.next = 14;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](5);
          console.log("An error when send mail", _context2.t0.message);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[5, 11]]);
  }));
  return function sendMail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = sendMail;
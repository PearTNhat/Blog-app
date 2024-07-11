"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileRemover = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var fileRemover = exports.fileRemover = function fileRemover(filename) {
  _fs["default"].unlink(_path["default"].join(__dirname, "../uploads/".concat(filename)), function (err) {
    if (err) {
      console.log(err.code);
      if (err.code === "ENOENT") {
        console.log("File dose not exist, won't remove it.");
      } else {
        console.log("Error occurred while trying to remove file " + filename + " " + err.message);
      }
    } else {
      console.log("".concat(filename, " removed"));
    }
  });
};
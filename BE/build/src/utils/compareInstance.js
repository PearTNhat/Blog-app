"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareTwoObjects = exports.compareTwoArrays = exports.compareCategories = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var compareTwoArrays = exports.compareTwoArrays = function compareTwoArrays(a, b) {
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
var compareCategories = exports.compareCategories = function compareCategories(newData, origin) {
  if (newData.length !== origin.length) return false;
  for (var i = 0; i < newData.length; i++) {
    if (newData[i]._id !== origin[i].toString()) return false;
  }
  return true;
};
var compareTwoObjects = exports.compareTwoObjects = function compareTwoObjects(object1, object2) {
  var keys1 = Object.keys(object1);
  var keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) return false;
  for (var _i = 0, _keys = keys1; _i < _keys.length; _i++) {
    var key = _keys[_i];
    var val1 = object1[key];
    var val2 = object2[key];
    var areObjects = isObject(val1) && isObject(val2);
    if (areObjects && !compareTwoObjects(val1, val2) || !areObjects && val1 !== val2) {
      return false;
    }
  }
  return true;
};
var isObject = function isObject(object) {
  return object != null && (0, _typeof2["default"])(object) === "object";
};
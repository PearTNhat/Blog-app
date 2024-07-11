"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invalidPathHandler = exports.errorResponseHandler = void 0;
var errorResponseHandler = exports.errorResponseHandler = function errorResponseHandler(err, req, res, next) {
  // nếu có thêm tham số err (4 tham số) thì  khi nào dùng next(err) thì nó sẽ vào 4 tham số
  // next() là chạy vào middelware tiếp theo
  console.log(err.stack);
  var statusCode = err.statusCode || 400;
  return res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null
  });
};
var invalidPathHandler = exports.invalidPathHandler = function invalidPathHandler(req, res, next) {
  // Bởi vì k có res nào bắt path sai hết nên nó lại vào đây
  // nếu có thêm tham số err (4 tham số) thì  khi nào dùng next(err) thì nó sẽ vào 4 tham số
  // next() là chạy vào middelware tiếp theo
  console.log();
  var error = new Error("Invalid path");
  error.statusCode = 404;
  // đưa vào errorResponseHandler
  next(error);
};
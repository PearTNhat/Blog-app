"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
require("dotenv/config");
var _cors = _interopRequireDefault(require("cors"));
var _mongodb = require("./config/mongodb");
var _errorHandler = require("./middleware/errorHandler");
var _path = _interopRequireDefault(require("path"));
var _routes = require("./routes");
//Router

var corsOptions = {
  origin: [process.env.FRONTEND_URL],
  credentials: true,
  //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  exposedHeaders: ["x-filter", "x-current-page", "x-pages-size", "x-total-count", "x-total-page-count"]
};
var app = (0, _express["default"])();
app.use((0, _cors["default"])(corsOptions));
app.use(_express["default"].json());
app.set("view engine", "ejs");
app.set("views", _path["default"].join(__dirname, "/views"));
(0, _mongodb.connectDB)();
app.use("/uploads", _express["default"]["static"](_path["default"].join(__dirname, "/uploads")));
app.use("/api", _routes.API);
app.use(_errorHandler.invalidPathHandler);
app.use(_errorHandler.errorResponseHandler);
app.listen(process.env.PORT, function () {
  console.log("Example app listening on port ".concat(process.env.PORT));
});
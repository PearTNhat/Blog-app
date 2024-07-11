import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "~/config/mongodb";
import {
  errorResponseHandler,
  invalidPathHandler,
} from "./middleware/errorHandler";
import path from "path";
//Router
import { API } from "./routes";
const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  exposedHeaders: [
    "x-filter",
    "x-current-page",
    "x-pages-size",
    "x-total-count",
    "x-total-page-count",
  ],
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
connectDB();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api", API);
app.use(invalidPathHandler);
app.use(errorResponseHandler);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

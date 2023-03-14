const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const AuthRouter = require("./route/auth");
const UserRouter = require("./route/users.route");
const PostRoute = require("./route/post.route");
const CatRouter = require("./route/category.route");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

dotenv.config();

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("connected to mongoDb");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded");
});
app.use(
  cors({
    origin: ["http://localhost:5000", "https://blogallday-api.onrender.com"],
  })
);
app.use("/api/auth", AuthRouter);
app.use("/api/users/", UserRouter);
app.use("/api/posts", PostRoute);
app.use("/api/cat", CatRouter);
app.listen(5000, () => {
  console.log("server running");
});

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDb = require("./server/config/db");
const cookieParser = require("cookie-parser");
const port = 5000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/routes/auth", require("./server/routes/auth"));
app.use("/routes/user", require("./server/routes/Users"));
app.use("/routes/posts", require(".server/routes/Post"));

Promise.all([connectDb])
  .then(() =>
    app.listen(port, () => {
      console.log(`readHub listening on port ${port}`);
    })
  )
  .catch((error) => {
    console.error(`MongoDB Atlas Error: ${error}`);
    process.exit();
  });

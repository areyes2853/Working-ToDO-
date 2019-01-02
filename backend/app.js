const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts")
const userRoutes = require("./routes/user");
const app = express();

mongoose.connect("mongodb+srv://Todouser:Lily,12345$@todo-cmwlq.mongodb.net/todolist?", { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log("Shit didn't Connect")
  });


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.use("/posts",postsRoutes);
  app.use("/api/user",userRoutes);

module.exports = app;

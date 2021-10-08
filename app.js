const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const Blog = require("./src/models/blogModel");
const blogController = require("./src/controllers/blogController")(Blog);

const app = express();
const PORT = process.env.PORT || 3000;

// Setting up database
const username = "admin";
const password = "vG6AkxA6xS0QTdaG";
const dbName = "BloggingSiteDatabase";
const dbURL = `mongodb+srv://${username}:${password}@bloggingsite.p9f97.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(dbURL);

//Setting template engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.use("/", blogController);

app.listen(PORT, () => {
  debug(`Site is running on: ${chalk.blueBright(`http://localhost:${PORT}/`)}`);
});

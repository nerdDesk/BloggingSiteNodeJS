const mongoose = require("mongoose");

const { Schema } = mongoose;

const blogModel = new Schema({
  title: { type: String },
  categories: { type: String },
  content: { type: String },
});

module.exports = mongoose.model("Blog", blogModel);

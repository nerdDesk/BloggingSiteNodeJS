/*eslint-disable no-param-reassign*/
const express = require("express");
const debug = require("debug")("app");

function routes(Blog) {
  const blogController = express.Router();

  //GET: /
  //Display all the blogs
  blogController.route("/").get((req, res) => {
    const query = {};
    if (req.query.categories) {
      query.categories = req.query.categories;
    }
    Blog.find(query, (err, blogs) => {
      if (err) {
        return res.send(err);
      }
      return res.render("index", { blogs });
    });
  });

  //POST: /new
  //Save the newly created blog
  blogController.route("/new").post((req, res) => {
    const blog = new Blog(req.body);
    blog.categories =
      blog.categories.charAt(0).toUpperCase() + blog.categories.slice(1);
    debug(blog);
    blog.save();
    return res.status(201).redirect("/" + blog._id);
  });

  //GET: /new
  //Form to create a new blog
  blogController.route("/new").get((req, res) => res.render("newBlog"));

  //GET: /edit
  //Form to update a blog
  blogController.route("/edit/:blogId").get((req, res) => {
    Blog.findById(req.params.blogId, (err, blog) => {
      if (err) {
        return res.send(err);
      }
      return res.render("editBlog", { blog });
    });
  });

  //PUT: /edit/:blogId
  //Update the blog
  blogController.route("/edit/:blogId").put((req, res) => {
    Blog.findById(req.params.blogId, (err, blog) => {
      if (err) {
        return res.send(err);
      }
      blog.title = req.body.title;
      blog.categories = req.body.categories;
      blog.content = req.body.content;
      blog.save();
      res.status(200).redirect("/" + blog._id);
    });
  });

  //Get blog for the corresponding blogId
  blogController.use("/:blogId", (req, res, next) => {
    Blog.findById(req.params.blogId, (err, blog) => {
      if (err) {
        return res.send(err);
      }
      if (blog) {
        req.blog = blog;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  //GET: /:blogId
  //Load the selected blog
  blogController.route("/:blogId").get((req, res) => {
    const { blog } = req;
    res.render("showBlog", { blog });
  });

  //DELETE: /:blogId
  //Delete a blog
  blogController.route("/:blogId").delete((req, res) => {
    req.blog.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.status(204).redirect("/");
    });
  });

  return blogController;
}

module.exports = routes;

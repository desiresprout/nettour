const Router = require("koa-router");
const posts = new Router();
const postsctrl = require("./posts_controll");
const commentsctrl = require("./comments_controll");
const filesctrl = require("./files_controll");
const likesctrl = require("./likes_controll");

posts.get("/", postsctrl.postlists);
posts.post("/", postsctrl.writepost);
posts.get("/post/:name/:urlslug", postsctrl.readpost);
posts.get("/post/:id", postsctrl.getpost);
posts.patch("/post/edit", postsctrl.editpost);

posts.post("/post/:postid/comments", commentsctrl.writecomment);
posts.patch("/post/comments", commentsctrl.editcomment);
posts.delete("/post/:id", postsctrl.removepost);
posts.patch("/delete/comment", commentsctrl.deletecomment);

posts.post("/createurl", filesctrl.createurl);
posts.post("/images", filesctrl.imageupload);

posts.post("/:postid/likes", likesctrl.like);
posts.delete("/:postid/likes", likesctrl.unlike);

module.exports = posts;

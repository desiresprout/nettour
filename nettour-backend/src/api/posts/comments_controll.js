const Joi = require("joi");
const Post = require("models/posts");
const ObjectId = require("mongoose").Types.ObjectId;

exports.writecomment = async ctx => {
  const { user } = ctx.request;

  if (!user) {
    ctx.status = 403;
    return;
  }

  const schema = Joi.object().keys({
    currentusername: Joi.string().required(),
    comment: Joi.string().min(1).max(100).required(),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { currentusername, comment } = ctx.request.body;
  const { postid } = ctx.params;

  if (!ObjectId.isValid(postid)) {
    ctx.status = 400;
    return;
  }

  let post = null;

  try {
    post = await Post.findById(postid);
  } catch (e) {
    ctx.throw(500, e);
  }

  if (!post) {
    ctx.status = 404;
    return;
  }

  try {
    await post.writecomment({ currentusername, comment });
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = {
    comments: post.comments,
  };
};

exports.editcomment = async ctx => {
  const { user } = ctx.request;

  if (!user) {
    ctx.status = 403;
    return;
  }

  const schema = Joi.object().keys({
    commentid: Joi.string().required(),
    comment: Joi.string().min(1).max(100).required(),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { commentid, comment } = ctx.request.body;

  if (!ObjectId.isValid(commentid)) {
    ctx.status = 400;
    return;
  }

  let edit = null;

  try {
    edit = await Post.findOneAndUpdate(
      { "comments._id": commentid },
      { $set: { "comments.$.comment": comment } },
      { new: true }
    ).select("comments");
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = {
    comments: edit.comments,
  };
};

exports.deletecomment = async ctx => {
  /*const { user } = ctx.request;
    
    if(!user) {
        ctx.status = 403; 
        return;
    }     */
  //console.log("hi");
  const schema = Joi.object().keys({
    commentid: Joi.string().required(),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 401;
    return;
  }

  const { commentid } = ctx.request.body;

  let deletecomment = null;

  try {
    deletecomment = await Post.findOneAndUpdate(
      { "comments._id": commentid },
      {
        $pull: { comments: { _id: commentid } },
      },
      { new: true }
    ).select("-_id comments");
  } catch (e) {
    ctx.throw(e, 400);
  }

  ctx.body = deletecomment;
};

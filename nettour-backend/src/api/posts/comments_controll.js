const Joi = require('joi');
const Post = require('models/posts');
const {ObjectId} = require('mongoose').Types;

exports.writecomment = async (ctx) => {  
    const { user } = ctx.request;
    //console.log(user);
    if(!user) {
        ctx.status = 403; 
        return;
    }
    
    const schema = Joi.object().keys({
        comment: Joi.string().min(1).max(100).required()
    });

    const result = Joi.validate(ctx.request.body, schema);
    if(result.error) {
        ctx.status = 400;
        return;
    }

    const { username } = user.profile;
    const { comment } = ctx.request.body;
    const { postid } = ctx.params;   

    
    if(!ObjectId.isValid(postid)) {
        ctx.status = 400; 
        return;
    }

    let post = null;

    try {
        post = await Post.findById(postid);
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!post) {
        ctx.status = 404; 
        return;
    }
    
    try {
        await post.writecomment({username,comment});
    } catch (e) {
        ctx.throw(500, e);
    }

    
    ctx.body = post.comments;
};

//수정댓글로 체인지
exports.readcomment = async(ctx) => {
   
    const { postid } = ctx.params;  

    if(!ObjectId.isValid(postid)) {
        ctx.status = 400; 
        return;
    }

    let post = null;

    try {
        post = await Post.findById(postid);
    } catch (e) {
        ctx.throw(500, e);
    }
    //console.log(post.comments);
    console.log("readcomment");
    ctx.body = post.comments;


};
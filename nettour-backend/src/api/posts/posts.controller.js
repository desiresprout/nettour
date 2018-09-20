const Account = require('models/account');
const Post = require('models/posts');
const Joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;
const m = require('moment');


exports.write  = async(ctx)=>{
    const { user } = ctx.request;
    if(!user) {        
        ctx.status = 403;
        ctx.body = { message: ' not logged in' };
        return;
    }
    let account;
    try {
        account = await Account.findById(user._id).exec();
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!account) {
        ctx.status = 403; 
        return;
    }

    const count = account.thoughtCount + 1;

        const schema = Joi.object().keys({
        content: Joi.string().min(5).max(1000).required() 
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {        
        ctx.status = 400; // Bad request
        return;
    }

    const { content } = ctx.request.body;

   
    let post;
    try {
        post = await Post.write({
            count,
            username: user.profile.username,
            content
        });
        await account.increaseThoughtCount();
    } catch (e) {
        ctx.throw(500, e);
    }

    /* 포스트 정보 반환 */
    ctx.body = 'true';
    
};

exports.list = async (ctx) => {
    const { cursor, username } = ctx.query; 

    if(cursor && !ObjectId.isValid(cursor)) {
        ctx.status = 400; // Bad Request
        return;    
    }

    let posts = null;

    try{
      posts = await Post.list( { cursor, username } );  
    } catch(e){
        ctx.throw(500,e);
    }
    
    const next = posts.length === 20 ? `/api/posts/?${username ? `username=${username}&` : ''}cursor=${posts[19]._id}` : null;
   
    


    

    ctx.body = {
        next,
        data: posts
    };
};
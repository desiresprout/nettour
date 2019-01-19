const Account = require('models/account');
const Post = require('models/posts');
const Joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs');


exports.writepost  = async(ctx)=>{
    const schema = Joi.object().keys({
        title : Joi.string().required().trim().min(2).max(150),
        content: Joi.string().min(5).required(), 
        slug :  Joi.string().min(1).required(),
        imageurl : Joi.string().min(10)             
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {        
        ctx.status = 401;       
        console.log(result.error);        
        return;
    }     
    const { user } = ctx.request;    
    
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
    const { title , content, slug, imageurl } = ctx.request.body;   
    
    let post;    

    try {
        post = await Post.writepost({            
            username: user.profile.username, 
            title,                      
            content,            
            url_slug : slug,
            thumbnail : imageurl          
        });
        await account.increasePostCount();               
        
    } catch (e) {
        ctx.throw(500, e);
    }   
    post = post.toJSON();
    delete post.likes;
    post.liked = false;

    ctx.body = post;  
    
};

exports.postlists = async (ctx) => {
    const { cursor, username } = ctx.query; 

    if(cursor && !ObjectId.isValid(cursor)) {
        ctx.status = 400; 
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

exports.readpost = async(ctx)=>{
    const { name, urlslug } = ctx.params;   
    
    const { user } = ctx.request;       
    const self = user ? user.profile.username : null;
    
    let post;    

    try {        
        post = await Post.readpost({
            name, 
            urlslug,
            self 
        });
        
           
    } catch (e) {
        ctx.throw(500, e);
    }       
    //console.log(post);
    let checklike= post.likes;    
    let liked;

    // 로그인안한상태 liked - false
    // post.likes.length==0일떄  liked - false
    // 로그인했는데 likes 배열에 없는경우 liked - false
    // 로그인했는데 likes 배열에 있는경우 liked - true    
       
        //배열에 있으면 0을 반환
        if(user){            
            checklike.indexOf(user.profile.username) == 0 ? liked = true : liked = false             
            // 로그인 한 상태에서 좋아요를 눌른상태면 true 아니면 false
        }

        if(!user || post.likes.length == 0 ){  // 로그안한거나 좋아요가 0일때는 false로
            liked = false;
        }
    
    delete post.likes;
    ctx.body = {
        post : post,
        liked : liked,
       
    };    

};

exports.getpost = async(ctx)=>{
    const { id } = ctx.params; 
    
    if(!ObjectId.isValid(id)) {
        ctx.status = 400; 
        return;
    }
    
    let getpost = null;
    try{
        getpost = await Post.findById(id).select('_id title content');
    }catch(e){
        console.error(e);
    }
    
    ctx.body = getpost;
};

exports.editpost = async(ctx)=>{

    const schema = Joi.object().keys({
        id : Joi.string().required().trim().min(2).max(150),
        content: Joi.string().min(5).required(), 
        slug :  Joi.string().min(5).required(),
        title : Joi.string().min(5).required(),
        imagepath : Joi.string().min(10)            
    });

    const result = Joi.validate(ctx.request.body, schema);
    
    if(result.error) {        
        ctx.status = 401;       
        console.log(result.error);        
        return;
    }  
   

    let editpost = null;
        //await Post.findByIdAndUpdate(postid, {'$set' : { 'comments.$.comment' : comment  }  })
        //{         $set: { text: req.body.text, title: req.body.title }}
    try{
        editpost = await Post.findByIdAndUpdate(ctx.request.body.id,                    
            { $set : { 
                        title : ctx.request.body.title, 
                        content : ctx.request.body.content, 
                        url_slug : ctx.request.body.slug,
                        thumbnail : ctx.request.body.imagepath
                     } 
            },
        { new : true}).select('_id title content url_slug createdAt username').lean();
        if(!editpost){
            ctx.status = 400;
            return;
        }
    }catch(e){
        ctx.throw(e,500);
    }
    ctx.body = editpost;
    
};

exports.removepost = async (ctx) => {
    const { id } = ctx.params;
    
    try {
      await Account.decreasePostCount();
      await Post.findByIdAndRemove(id).exec();
      ctx.status = 204;
    } catch (e) {
      ctx.throw(e, 500);
    }

};
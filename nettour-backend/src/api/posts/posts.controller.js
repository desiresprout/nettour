const Account = require('models/account');
const Post = require('models/posts');
const Joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs');
const AWS = require('aws-sdk');
const { formatFileName } = require('../../lib/common');



exports.write  = async(ctx)=>{
    const { user } = ctx.request;

    if(!user) {        
        ctx.status = 403;
        ctx.body = { message: ' not login' };
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

    const count = account.postCount + 1;

    const schema = Joi.object().keys({
        title : Joi.string().min(5).max(50).required(),
        content: Joi.string().min(5).required(),
        state : Joi.any().required(),
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {        
        ctx.status = 401; 
        return;
    }

    const { title, content, state } = ctx.request.body;
      
    const as = '';
    const URL_SLUG = as.concat(user.profile.username +'/' + title);
    
    
    let post;
    try {
        post = await Post.write({
            title,
            username: user.profile.username,         
            content,
            state,
            url_slug : URL_SLUG,   
        });
        
    } catch (e) {
        ctx.throw(500, e);
    }
    
    
    ctx.body = post;
    
};

exports.list = async (ctx) => {
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

exports.imageupload = async (ctx)=>{ 
    const { file } = ctx.request.files;
    const { name } = file;    

    if(!file) {
        ctx.status = 400;
        return;
      }     

    const stats = fs.statSync(file.path);

    if(stats.size > 1024 * 1024 * 5) { // 5mb
        ctx.status = 413; 
        return;
      }

    const imagepath = formatFileName(name);
    const read = fs.createReadStream(file.path);
    const filetype = file.type;    
    
    const s3 = new AWS.S3({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.SECRET_ACCESS_KEY_ID,
        }
      });

    try {
        const response = await s3
          .upload({
            Bucket: 's3nettour',
            Key: imagepath, //
            Body: read,  //스트림
            ContentType: filetype,  //image/png
            ACL: 'public-read'
          }).promise();            
    
        if(!response || !response.ETag) {
          console.log('error', response);
          ctx.status = 418;
          return;
        }
      } catch (e) {
        ctx.throw(500,e);        
      }
      ctx.body = imagepath; 
      
};

exports.postdetail = async(ctx)=>{


};
const Account = require('models/account');
const Post = require('models/posts');
const Joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs');
const AWS = require('aws-sdk');
const { formatFileName, Escapeurl } = require('../../lib/common');

exports.writepost  = async(ctx)=>{    
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
    const count = account.postCount + 1;
    //trim()은 공백이 없어야댐, state : Joi.any().required(),
    /*   thumbnail: Joi.string().uri().allow(null),    */
    //state : Joi.any().required(), 
    const schema = Joi.object().keys({
        title : Joi.string().required().trim().min(2).max(150),
        content: Joi.string().min(5).required(), 
        slug :  Joi.string().min(1).required(),           
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {        
        ctx.status = 401;       
        console.log(result.error);        
        return;
    }  
    //thumbnail,
    const { title , content, slug } = ctx.request.body;    

    let post;
    //thumnail 작업
    try {
        post = await Post.writepost({
            username: user.profile.username, 
            title,                   
            content,            
            url_slug : slug,  
        });        
        //url_slug : Escapeurl(title),  
    } catch (e) {
        ctx.throw(500, e);
    }   

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
    //console.log(posts);
    
    ctx.body = {
        next,
        data: posts
    };
};

exports.imageupload = async (ctx)=>{
    //console.log(ctx.request.headers); 
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
            Bucket: 'images.nettour.ml',
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
      //`https://s3.amazonaws.com/s3nettour/${res.data}`
      //console.log(imagepath);
      
      ctx.body = imagepath; 
      
};

exports.readpost = async(ctx)=>{
    const { name, urlslug } = ctx.params; 
    //console.log(urlslug); 

    /*let account;
    try {
        //console.time();
        account = await Account.findById(name._id).select('_id').exec();
        //console.timeEnd();      
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!account) {
        ctx.status = 403; 
        return;
    }   */        
    
    let post;    
    try {
        //console.time();
        post = await Post.readpost({
            name, 
            urlslug 
        });
        //console.log(post);   
        //console.timeEnd();     
    } catch (e) {
        ctx.throw(500, e);
    }   
  
    ctx.body = post;    

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
    //console.log(getpost);
    ctx.body = getpost;
};

exports.editpost = async(ctx)=>{

    //id = postid, content
    const schema = Joi.object().keys({
        id : Joi.string().required().trim().min(2).max(150),
        content: Joi.string().min(5).required(), 
        slug :  Joi.string().min(5).required(),
        title : Joi.string().min(5).required(),            
    });

    const result = Joi.validate(ctx.request.body, schema);
    
    if(result.error) {        
        ctx.status = 401;       
        console.log(result.error);        
        return;
    }  

   // const { id, title, content, slug} = ctx.request.body;

    let editpost = null;
        //await Post.findByIdAndUpdate(postid, {'$set' : { 'comments.$.comment' : comment  }  })
        //{         $set: { text: req.body.text, title: req.body.title }}
    try{
        editpost = await Post.findByIdAndUpdate(ctx.request.body.id,                    
            { $set : { 
                title : ctx.request.body.title, 
                content : ctx.request.body.content, 
                url_slug : ctx.request.body.slug 
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
   // console.log(editpost);

    ctx.body = editpost;

    
};

exports.removepost = async (ctx) => {
    const { id } = ctx.params;
    console.log(id);
    
    try {
      await Post.findByIdAndRemove(id).exec();
      ctx.status = 204;
    } catch (e) {
      ctx.throw(e, 500);
    }

};
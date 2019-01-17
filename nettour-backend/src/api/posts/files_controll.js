const format = require('date-fns/format');
const Post = require('models/posts');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({ region: 'ap-northeast-2', signatureVersion: 'v4' });


exports.createurl = async (ctx) => {
    const { filename, type } = ctx.request.body;    
    const { user } = ctx.request;
    

    if(!user) {
        ctx.status = 403;
        ctx.body = {
            error : 'not login'
        };
        return;
    }
    if(!filename){
        ctx.status = 403;
        ctx.body ={
            error : 'not filename'
        };
        return;
    }         
    const { username } = user.profile;
    //const searchname = await Account.findByUsername(username);
    
    // await Post.findOneAndUpdate({ 'username' : username}, 
    //     { $set : { 'post_thumbnail' : path }}, { new : true});

    //여기서할게 - findoneandupdate 해가지고 imagepath를 post thumbnail에 저장
    //여기서 post 도큐먼트를 만들때 잇고, 썸네일을 변경할때는 findoneandupdate 써야된다..
    
    
    /*
        포스트 등록
        썸네일 등록

        썸네일을 등록안하고 포스트만 등록할 경우가 있다.   -> 후에 썸네일 등록할 가능성이 있다.

        썸네일을 등록하고 포스트를 등록할 경우가 있다.

    */
    
    const newDate = new Date();  
    
    const s3 = new AWS.S3({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.SECRET_ACCESS_KEY_ID,
        }
      }); 
     
    const path = `post-thumbnail/${newDate}/${username}/${filename}`;
    console.log(username);
    const asdf = await Post.findOneAndUpdate({ 'username' : username}, 
        { $set : { 'post_thumbnail' : path }}, { new : true});

    console.log(asdf);
   

    const url = await s3.getSignedUrl('putObject', {
        Bucket: 'images.nettour.ml',
        Key: path,
        ContentType: type,
        Expires: 300
      });   


    ctx.body = {
        //user : asdf._id,
        url : url,
        status : true       

    };
    
};


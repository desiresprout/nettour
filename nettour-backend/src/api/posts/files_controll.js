const format = require('date-fns/format');
const Post = require('models/posts');
const AWS = require('aws-sdk');
const kolocale = require('date-fns/locale/ko')

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
    
    const s3 = new AWS.S3({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.SECRET_ACCESS_KEY_ID,
        }
      }); 
   
      const newDate = format(
        new Date(),
        'YYYY-MM-DD.HH.mm.ss:Z',
        {locale: kolocale}
      );

    const path = `post-thumbnail/${newDate}/${username}/${filename}`;   

    const url = await s3.getSignedUrl('putObject', {
        Bucket: 'images.nettour.ml',
        Key: path,
        ContentType: type,
        Expires: 300,
        ACL: 'public-read'
      });    
    ctx.body = {       
        url : url,
        imagepath : path,
        status : true       

    };
    
};


const format = require('date-fns/format');
const Post = require('models/posts');
const AWS = require('aws-sdk');
const kolocale = require('date-fns/locale/ko')

const s3 = new AWS.S3({
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY_ID,
    }
  }); 

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
    
   
      const newDate = format(
        new Date(),
        'YYYY-MM-DD.HH.mm.ss',
        {locale: kolocale}
      );

    const path = `post-thumbnail/${newDate}/${username}/${filename}`;     
    

    const url = await s3.getSignedUrl('putObject', {
        Bucket: 'images.nettour.cf',
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

exports.imageupload = async (ctx)=>{
    
    const { file } = ctx.request.files;
    const { name } = file;
    const { user } = ctx.request;

    if(!user) {
        ctx.status = 403;
        ctx.body = {
            error : 'not login'
        };
        return;
    }    

    if(!file) {
        ctx.status = 400;
        ctx.body = {
            error : 'no file'
         }
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
    

    try {
        const response = await s3
          .upload({
            Bucket: 'images.nettour.cf',
            Key: imagepath, //
            Body: read,  //
            ContentType: filetype,  //
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
      console.log(imagepath);
      
      ctx.body = imagepath; 
      
};


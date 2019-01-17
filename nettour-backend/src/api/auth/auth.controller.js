const Joi = require('joi');
const Account = require('models/account');  
const nodemailer = require('nodemailer');
const shortid = require('shortid');
const { sendmail } = require('lib/sendmail');

/* exports.localRegister = async (ctx) => {
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(4).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
    });    
    const result = Joi.validate(ctx.request.body, schema);    
    
    if(result.error) {
        ctx.status = 400;
        return;
    }      

    let existing = null;
    try {        
        existing = await Account.findByEmailOrUsername(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    if(existing) {
        ctx.status = 409; 
        ctx.body = {
            key: existing.email === ctx.request.body.email ? 'email' : 'username'
        };
        return;
    }

    
    let account = null;
    try {
        account = await Account.localRegister(ctx.request.body); 
    } catch (e) {
        ctx.throw(500, e);
    }

    let token = null;
    try {
        token = await account.generateToken();
    } catch (e) {
        ctx.throw(500, e);
    }
    
    ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 }); //네임,값
    
    ctx.body = account.profile; // 이메일확인하세요 메세지 보내기
}; 
 */


exports.localLogin = async (ctx) => {
   
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    
    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400; // Bad Request
        return;
    }
    const { email, password } = ctx.request.body; 

    let account = null;
    try {        
        account = await Account.findByEmail(email);        
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!account || !account.validatePassword(password)) {    
        ctx.status = 403; 
        return;
    }
     if(account.auth.is_authed === false){
        ctx.status = 401;
         return;
     }
    let token = null;
    try {        
        token = await account.generateToken();       
        
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    ctx.body = account.profile;
};

// 이메일 / 아이디 존재유무 확인
exports.exists = async (ctx) => {
    
    const { key, value } = ctx.params;
    let account = null;

    try {
        // key 에 따라 findByEmail 혹은 findByUsername 을 실행합니다.
        account = await (key === 'email' ? Account.findByEmail(value) : Account.findByUsername(value));    
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = {
        exists: account !== null
    };
};

exports.socialRegister = async (ctx)=>{
    const { body } = ctx.request; // 토큰
    const { provider } = ctx.params; // 페북인지 구글인지

    const schema = Joi.object({
            accessToken : Joi.string().required(),
    });
}


exports.logout = async (ctx) => {
    ctx.cookies.set('access_token', null, {
        maxAge: 0, 
        httpOnly: true
    });
    ctx.status = 204;
};

exports.check = (ctx) => {    
    const { user } = ctx.request;    

    if(!user) {
        ctx.status = 403; // Forbidden
        return;
    }

    ctx.body = user.profile;
};

exports.getCode = async(ctx) => {

    const { email, code } = ctx.query;

    let account = null;

    try{
        account = await Account.findByUserCode({code,email});       
    }catch(e){
        console.log(e);
    }
    if(!account){
        ctx.status = 200;
        ctx.body =  {
            code : 'error',
            message : '이메일 또는 인증코드 오류'
        };
        return;
    }
    if(account.auth.is_authed){
         ctx.body = {
            code : 'ok',
            message : '이미 인증된 회원입니다'
        } 
        return;        
    }  
    
    const d = new Date(account.auth.code_created);
    if (Date.now() - d.getTime() > 1000 * 60 * 60 * 24) {
        
        ctx.status = 200;
        ctx.body = {
            code : 'code',
            message: '인증코드 만료되었습니다',
        };
        return;
    }

    await Account.emailChangeAuth(account._id);    
    ctx.status = 200;
    ctx.body = {
        code : 'ok',
        message : '인증완료되었습니다'
    };       
   
};

exports.authEmail = async(ctx) =>{
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(4).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
    });    
    const result = Joi.validate(ctx.request.body, schema);    
    
    if(result.error) {
        ctx.status = 400;
        return;
    }      
    const { email, username, password} = ctx.request.body;
    
    let existing = null;
    try {        
        existing = await Account.findByEmailOrUsername({username, email});
    } catch (e) {
        ctx.throw(500, e);
    }    
    
    if(existing) {
        ctx.status = 409; 
        ctx.body = {
            key: existing.email === ctx.request.body.email ? 'email' : 'username'
        };
        return;
    }

    let account = null;

    try {
        account = await Account.localRegister(ctx.request.body); //username, email,password 넣음
    } catch (e) {
        ctx.throw(500, e);
    }       

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,  
            pass: process.env.AUTH_PASSWORD        
        }
    });
    let code = await Account.findByEmail(email);
        
    let mailOptions = {
        from: process.env.AUTH_EMAIL,    
        to: email ,                     
        subject: '안녕하세요, NetTouR입니다. 이메일 인증을 해주세요.',
        html: `<p>아래의 링크를 클릭해주세요 !</p>
            <a href="localhost:3000/auth-email?email=${email}&code=${code.auth.code}">인증하기</a>` 
    };
    //<a href="localhost:4000/api/auth/getcode/?email=${email}&code=${code.auth.code}
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });

    ctx.body = true;

};

exports.resetcode = async(ctx) => {
    const { email } = ctx.params;        
    const reset = await Account.findOneAndUpdate({email}, { $set: { 'auth.code' : shortid.generate(), 'auth.code_created' : Date.now() }}, { new : true} );
       
    if(reset.auth.is_authed){
        ctx.body = "잘못된 접근"
        return;
    }    
    sendmail(email, reset.auth.code);
    
    ctx.body = true;

}



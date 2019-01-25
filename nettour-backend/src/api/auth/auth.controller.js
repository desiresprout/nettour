const Joi = require('joi');
const Account = require('models/account');  
const nodemailer = require('nodemailer');
const shortid = require('shortid');
const { sendmail } = require('lib/sendmail');
const social = require('lib/social');

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

exports.exists = async (ctx) => {
    
    const { key, value } = ctx.params;
    let account = null;

    try {
        account = await (key === 'email' ? Account.findByEmail(value) : Account.findByUsername(value));    
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = {
        exists: account !== null
    };
};

exports.socialLogin = async (ctx) => {    
   
    const schema = Joi.object().keys({
        accessToken: Joi.string().required()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        return;
    }

    const { provider } = ctx.params;
    const { accessToken } = ctx.request.body;
    // console.log(provider);
    // console.log(accessToken);

    let profile = null;
    try {
        profile = await social[provider].getProfile(accessToken);
        console.log(profile);
    } catch (e) {       
        ctx.status = 403; 
        return;
    }

   
    let account = null;
    try {
        account = await Account.findByProviderId(provider, profile.id);
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!account && profile.email) {
        // 계정정보는 없지만, 소셜 계정에서 이메일이 있는 경우엔, 동일한 이메일로 가입한 계정이 있는지 조사
        try {
            account = await Account.findByEmail(profile.email);
            if(account) {
                account.social[provider] = {
                    id: profile.id,
                    accessToken
                };
                await account.save();
            }
        } catch (e) {
            ctx.throw(500, e);
        }
    }

    if(!account) {
        ctx.body = null;
        ctx.status = 204; 
        return;
    }

    try {
        const token = await account.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            httpOnly: true
        });
        ctx.body = account.profile;
    } catch (e) {
        ctx.throw(500, e);
    }
};

exports.socialRegister = async (ctx) => {    
    console.log(ctx.request.accessToken);

    // const schema = Joi.object().keys({
    //     username: Joi.string().alphanum().min(4).max(15).required(),
    //     accessToken: Joi.string().required()
    // });

    // const result = Joi.validate(ctx.request.body, schema);

    // if(result.error) {
    //     ctx.status = 400; 
    //     return;
    // }
    // const { provider } = ctx.params;
    // const { accessToken, username } = ctx.request.body;
    
    // try {
    //     const usernameExists = await Account.findByUsername(username);
    //     if(usernameExists) {
    //         ctx.status = 409; 
    //         ctx.body = { message: 'duplicated username' };
    //     }
    // } catch (e) {
    //     ctx.throw(500, e);
    // }    
    
    // let profile = null;
    // try {
    //     profile = await social[provider].getProfile(accessToken);
    //     console.log(profile);
    // } catch (e) {
    //     ctx.status = 403;
    //     return;
    // }

    // let account = null;
    // try {
    //     account = await Account.findByProviderId(provider, profile.id);
    // } catch (e) {
    //     ctx.throw(500, e);
    // }

    // if(account) {       
    //     ctx.status = 409; 
    //     ctx.body = { message: 'already registered' };
    //     return;
    // }    
    // try {
    //     account = await Account.socialRegister({
    //         provider,
    //         profile,
    //         accessToken,
    //         username
    //     });
    // } catch (e) {
    //     ctx.throw(500, e);
    // }

    // try {
    //     const token = await account.generateToken();
    //     ctx.cookies.set('access_token', token, {
    //         maxAge: 1000 * 60 * 60 * 24 * 7,
    //         httpOnly: true
    //     });
    //     ctx.body = account.profile;
    // } catch (e) {
    //     ctx.throw(500, e);
    // }
};


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
        account = await Account.localRegister(ctx.request.body); 
    } catch (e) {
        ctx.throw(500, e);
    }       

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,  
            pass: process.env.EMAIL_PASSWORD        
        }
    });
    let code = await Account.findByEmail(email);
    /*
        `<p>아래의 링크를 클릭해주세요 !</p>
            <a href="https://nettour.cf/auth-email?email=${email}&code=${code.auth.code}">인증하기</a>` 
    */
    let mailOptions = {
        from: process.env.EMAIL,    
        to: email ,                     
        subject: '안녕하세요, NetTouR입니다. 이메일 인증을 해주세요.',
        html: `<a href="https://nettour.cf"><img src="https://images.nettour.cf/nettour_logo.png" style="display: block; 
        width: 128px; margin: 0 auto;"/></a>
          <div style="max-width: 100%; width: 400px; margin: 0 auto; padding: 1rem; text-align: justify; 
                      background: #f8f9fa; border: 1px solid #dee2e6; box-sizing: border-box; border-radius: 5px; 
                      color: #339af0; margin-top: 0.5rem; box-sizing: border-box;">
            <b style="black">안녕하세요! </b>
    회원가입을 위해 이메일 인증을 진행해주세요.
          </div>
          
          <a href="https://nettour.cf/auth-email?email=${email}&code=${code.auth.code}" 
             style="text-decoration: none; width: 400px; text-align:center; display:block; margin: 0 auto; 
              margin-top: 1rem;background: #1971c2; padding-top: 1rem; color: white; font-size: 1.25rem; 
              padding-bottom: 1rem;font-weight: 600; border-radius: 4px;">계속하기</a>
          
          
    <div style="text-align:center; margin-top:1rem; margin-bottom:1rem;font-weight:600; 
                color:#1864ab; margin-bottom:1rem;">
      위 버튼을 클릭하여 인증을 진행하세요. 
    <br/></div>            
    <div style="text-align:center;font-weight:600; color:#1864ab ">이 링크는 24시간동안입니다. </div></div>` 
    };  
    
    //<a href="localhost:3000/auth-email?email=${email}&code=${code.auth.code}">인증하기</a>` 
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



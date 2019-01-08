const nodemailer = require('nodemailer');

/* function sendmail(email, code) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,  
            pass: process.env.AUTH_PASSWORD        
        }
    });
    
    let mailOptions = {
        from: process.env.AUTH_EMAIL,    
        to: email ,                     
        subject: '안녕하세요, NetTouR입니다. 이메일 인증을 해주세요.',
        html: `<p>아래의 링크를 클릭해주세요 !</p>
          <a href="http://localhost:4000/api/auth/code?email=${email}/&code=abcdefg">인증하기</a>` 
    };
 
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
};

exports.sendmail = sendmail; */


exports.sendmail = (email, code ) =>{
        let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,  
            pass: process.env.AUTH_PASSWORD        
        }
    });
    
    let mailOptions = {
        from: process.env.AUTH_EMAIL,    
        to: email ,                     
        subject: '안녕하세요, NetTouR입니다. 이메일 인증을 해주세요.',
        html: `<p>아래의 링크를 클릭해주세요 !</p>
          <a href="localhost:3000/auth-email?email=${email}&code=${code}">인증하기</a>` 
    };
    //<a href="http://localhost:4000/api/auth/code?email=${email}/&code=${code}">인증하기</a>` 
 
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}

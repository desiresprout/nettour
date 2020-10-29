const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendmail = (email, code) => {
  const clientUrl =
    process.env.NODE_ENV === "dev"
      ? process.env.DEV_CLIENT_URL
      : process.env.PROD_CLIENT_URL;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "안녕하세요, NetTouR입니다. 이메일 인증을 해주세요.",
    html: `<p>아래의 링크를 클릭해주세요 !</p>
          <a href=${clientUrl}/auth-email?email=${email}&code=${code}">인증하기</a>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

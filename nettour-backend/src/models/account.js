const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const shortid = require('shortid');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
    profile: {
        username: String,
        thumbnail: { type: String, default: '/static/images/thumbnail.png' }
    },
    auth : {
        code : { type : String, default : shortid.generate() },
        code_created : { type : Date, default : Date.now},
        is_authed : { type : Boolean, default : false}
    },   
    
    social: {
        facebook: {
            id: String,
            accessToken: String
        },
        google: {
            id: String,
            accessToken: String
        }
    },
    email: { type: String },
    password: { type: String }, 
    postCount: { type: Number, default: 0 }, 
    createdAt: { type: Date, default: Date.now }
    
});

Account.statics.findByUsername = function(username) {
    // 객체에 내장되어있는 값을 사용 할 때는 객체명.키 이런식으로 쿼리하면 됩니다
    return this.findOne({'profile.username': username}).exec();
};

Account.statics.findByEmail = function(email) {
    
    return this.findOne({'email' : email})
    .select('-_id auth')
    .exec();
};

Account.statics.findByEmailOrUsername = function({username, email}) {
    return this.findOne({
        // $or 연산자를 통해 둘중에 하나를 만족하는 데이터를 찾습니다
        $or: [
            { 'profile.username': username },
            { email }
        ]
    }).exec();
};

Account.statics.findByUserCode = function(code,email) {
    // 객체에 내장되어있는 값을 사용 할 때는 객체명.키 이런식으로 쿼리하면 됩니다
    return this.findOne({
        'auth.code' : code,
        'email' : email
    })
    .select('-_id auth email')
    .exec();
};

Account.statics.localRegister = function({ username, email, password }) {
  
    const account = new this({
        profile: {
            username            
        },
        email,
        password: hash(password)
    });

    return account.save();
};

Account.methods.validatePassword = function(password) {
    // 함수로 전달받은 password 의 해시값과, 데이터에 담겨있는 해시값과 비교를 합니다.
    const hashed = hash(password);
    return this.password === hashed;
};

const { generateToken } = require('../lib/token');

Account.methods.generateToken = function() {
    // JWT 에 담을 내용
    const payload = {
        _id: this._id,
        profile: this.profile
    };
    
    return generateToken(payload);  //generateToken(payload, 'account');
};

Account.methods.increasePostCount = function() {
    this.postCount++;
    return this.save();
};



module.exports = mongoose.model('Account', Account);
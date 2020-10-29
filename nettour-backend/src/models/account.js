const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const shortid = require("shortid");
const { generateToken } = require("../lib/token");

function hash(password) {
  return crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(password)
    .digest("hex");
}

const Account = new Schema({
  profile: {
    username: String,
    thumbnail: { type: String, default: "/static/images/thumbnail.png" },
  },
  auth: {
    code: { type: String, default: shortid.generate() },
    code_created: { type: Date, default: Date.now },
    is_authed: { type: Boolean, default: false },
  },

  social: {
    facebook: {
      id: String,
      accessToken: String,
    },
    google: {
      id: String,
      accessToken: String,
    },
  },
  email: { type: String },
  password: { type: String },
  postCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

Account.statics.findByUsername = function (username) {
  return this.findOne({ "profile.username": username }).exec();
};

Account.statics.findByEmail = function (email) {
  return this.findOne({ email: email }).exec();
};

Account.statics.findByEmailOrUsername = function ({ username, email }) {
  return this.findOne({
    $or: [{ "profile.username": username }, { email: email }],
  }).exec();
};

Account.statics.findByUserCode = function ({ code, email }) {
  return this.findOne({
    "auth.code": code,
    email: email,
  })
    .select("_id auth email")
    .exec();
};

Account.statics.localRegister = function ({ username, email, password }) {
  const account = new this({
    profile: {
      username,
    },
    email,
    password: hash(password),
  });

  return account.save();
};

Account.methods.validatePassword = function (password) {
  const hashed = hash(password);
  return this.password === hashed;
};

Account.methods.generateToken = function () {
  const payload = {
    _id: this._id,
    profile: this.profile,
  };

  return generateToken(payload);
};

Account.methods.increasePostCount = function () {
  this.postCount++;
  return this.save();
};

Account.methods.decreasePostCount = function () {
  this.postCount--;
  return this.save();
};

Account.statics.emailChangeAuth = function (id) {
  return this.findByIdAndUpdate(
    id,
    {
      $set: { "auth.is_authed": true },
    },
    {
      //new: true,
    }
  );
};

module.exports = mongoose.model("Account", Account);

const Router = require('koa-router');
const auth = new Router();
const authCtrl = require('./auth.controller');  // ./auth.controller

/* auth.post('/register/local', authCtrl.localRegister); */
auth.post('/login/local', authCtrl.localLogin);
auth.get('/exists/:key(email|username)/:value', authCtrl.exists);
auth.post('/login/:provider(facebook|google)', authCtrl.socialLogin);
auth.post('/register/:provider(facebook|google)', authCtrl.socialRegister);
auth.post('/logout', authCtrl.logout);
auth.get('/check', authCtrl.check);
auth.get('/getcode', authCtrl.getCode);
auth.post('/auth-email', authCtrl.authEmail);
auth.get('/resetcode/:email', authCtrl.resetcode);

module.exports = auth;
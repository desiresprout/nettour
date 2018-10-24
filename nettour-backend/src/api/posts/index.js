const Router = require('koa-router');
const posts = new Router();
const postsCtrl = require('./posts.controller');
const multer = require('multer');
const fs = require('fs');

posts.post('/', postsCtrl.write);
posts.get('/', postsCtrl.list);

posts.get('/detail', postsCtrl.postdetail)

posts.post('/images', postsCtrl.imageupload);

module.exports = posts;
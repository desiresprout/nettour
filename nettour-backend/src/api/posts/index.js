const Router = require('koa-router');
const posts = new Router();
const postsctrl = require('./posts_controll');
const commentsctrl = require('./comments_controll');

posts.get('/', postsctrl.postlists);

posts.post('/', postsctrl.writepost);

posts.get('/post/:name/:urlslug', postsctrl.readpost);

posts.post('/:postid/comments', commentsctrl.writecomment);


posts.post('/images', postsctrl.imageupload);

module.exports = posts;
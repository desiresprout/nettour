require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const api = require('api');   
const port = process.env.PORT || 4000;
const koabody = require('koa-body');
const mongoose = require('mongoose');
const { jwtMiddleware } = require('./lib/token');
const cors = require('@koa/cors');


mongoose.Promise = global.Promise; 


// mongodb 연결 , 아이디비번 만들것
mongoose.connect(process.env.MONGO_URI).then(
    (response) => {
        console.log('Successfully connected to mongodb');
    }
).catch(e => {
    console.error(e);
});

app.use(koabody({
    multipart : true,
}));
app.use(jwtMiddleware);
app.use(cors());


router.use('/api', api.routes());

router.get('/post', (ctx, next) => {
    ctx.body = 'post';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('nettour server is listening to port 4000');
});
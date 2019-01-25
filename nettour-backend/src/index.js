require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const api = require('api');   
const port = process.env.PORT || 5000;
const koabody = require('koa-body');
const mongoose = require('mongoose');
const { jwtMiddleware } = require('./lib/token');
const cors = require('@koa/cors');

mongoose.Promise = global.Promise; 

const options = {
    origin: process.env.NODE_ENV ==='dev' ? 'http://localhost:3000' : "https://nettour.ml",
    credentials : true
};
//credentials : process.env.NODE_ENV =='dev' ? false : true

mongoose.connect(process.env.NODE_ENV === 'dev' ? process.env.LOCAL_MONGO_URI : process.env.MONGO_URI).then(
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
app.use(cors(options ));





router.use('/api', api.routes());

router.get('/check', (ctx, next) => {
    ctx.body = 'check';
});

router.get('/db', (ctx, next) => {
    ctx.body = 'check';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`nettour server is listening to ${port}`);
});
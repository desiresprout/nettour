require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const api = require('api');   
const port = process.env.PORT || 4000;
const bodyParser = require('koa-bodyparser');

const mongoose = require('mongoose');
const { jwtMiddleware } = require('./lib/token');



mongoose.Promise = global.Promise; // Node 의 네이티브 Promise 사용
// mongodb 연결
mongoose.connect(process.env.MONGO_URI).then(
    (response) => {
        console.log('Successfully connected to mongodb');
    }
).catch(e => {
    console.error(e);
});

app.use(bodyParser());
app.use(jwtMiddleware);

router.use('/api', api.routes());

router.get('/post', (ctx, next) => {
    const { id } = ctx.request.query; // 주소 뒤에 ?id=10 이런식으로 작성된 쿼리는 ctx.request.query 에 파싱됩니다.
    if(id) {
        ctx.body = '포스트 #' + id;
    } else {
        ctx.body = '포스트 아이디가 없습니다.';
    }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('nettour server is listening to port 4000');
});
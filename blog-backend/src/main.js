require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

//비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env; //root디렉토리에 .env와 연결되고 있음, dotenv 라이브러리를 통해서 연결되는듯

//connect(url, mongo db option): promise type
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((e) => {
        console.error(e);
    });

import api from './api';

const app = new Koa();
const router = new Router();

//router 설정
router.use('/api', api.routes()); //api 라우트 적용

//router 적용 전에 bodyParser  적용 (:request body에 JSON을 파싱하여 서버에서 사용할 수 있게 해준다 )
app.use(bodyParser());

//app 인스턴스에 router를 적용
app.use(router.routes()).use(router.allowedMethods());

//PORT가 지정되어 있지 않다면 4000을 사용
const port = PORT || 4000;

app.listen(port, () => {
    console.log('Listening to port %d', port);
});

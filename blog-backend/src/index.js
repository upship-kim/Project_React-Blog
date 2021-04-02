const Koa = require('koa');
const Router = require('koa-router');
const api = require('./api');
const coffee = require('./api/test');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

//router 설정
router.use('/api', api.routes());
router.use('/drink', coffee.routes());

//router 적용 전에 bodyParser 적용
app.use(bodyParser());

//app 인스턴스에 router를 적용
app.use(router.routes()).use(router.allowedMethods());

// //koa는 미들웨어의 배열로 구성되어 있다.
// //app.use 를 통해 미들웨어 함수를 어플리케이션에 등록한다.
// // 첫번째 파라미터 ctx : context의 줄임말, 웹 요청과 응답에 관한 정보를 지니고 있음
// // 두번째 파라미터 next : 현재 처리중인 미들웨어의 다음 미들웨어를 호출하는 함수

// app.use(async (ctx, next) => {
//     console.log(ctx.url);
//     console.log(ctx.type);
//     console.log(1);

//     //url 파라미터 쿼리문이 다를 시 에러 발생
//     //검색 (http://localhost:4000/?auth=1)
//     if (ctx.query.auth !== '1') {
//         ctx.status = 401; //unauth
//         return;
//     }

//     //맞으면 next 미들웨어 처리
//     console.log('await before');
//     await next();
//     console.log('await after');
// });
// app.use((ctx, next) => {
//     console.log(2);
//     next();
// });

// app.use((ctx) => {
//     ctx.body = 'hello world';
// });

//라우터 설정
router.get('/', (ctx) => {
    ctx.body = '홈';
});

//url 파라미터
router.get('/about/:name?', (ctx) => {
    const { name } = ctx.params;
    ctx.body = name ? `${name}를 소개합니다 !` : `소개할 사람을 검색해주세요`;
});

// //url 쿼리
// router.get('/posts', (ctx) => {
//     const { id, name } = ctx.query;
//     ctx.body = id
//         ? `글 번호 #${id}` + (name ? ` 이름은 '${name}'` : '')
//         : `해당 글이 없습니다.`;
// });

//app 인스턴스에 라우터 적용

app.listen(4000, () => {
    console.log('Listening to port 4000');
});

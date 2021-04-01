const Koa = require('koa');
const app = new Koa();

//koa는 미들웨어의 배열로 구성되어 있다.
//app.use 를 통해 미들웨어 함수를 어플리케이션에 등록한다.
// 첫번째 파라미터 ctx : context의 줄임말, 웹 요청과 응답에 관한 정보를 지니고 있음
// 두번째 파라미터 next : 현재 처리중인 미들웨어의 다음 미들웨어를 호출하는 함수

app.use(async (ctx, next) => {
    console.log(ctx.url);
    console.log(ctx.type);
    console.log(1);

    //url 파라미터 쿼리문이 다를 시 에러 발생
    //검색 (http://localhost:4000/?auth=1)
    if (ctx.query.auth !== '1') {
        ctx.status = 401; //unauth
        return;
    }

    //맞으면 next 미들웨어 처리
    console.log('await before');
    await next();
    console.log('await after');
});
app.use((ctx, next) => {
    console.log(2);
    next();
});

app.use((ctx) => {
    ctx.body = 'hello world';
});

app.listen(4000, () => {
    console.log('Listening to port 4000');
});

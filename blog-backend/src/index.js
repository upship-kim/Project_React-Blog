const Koa = require('koa');
const app = new Koa();

//app.use 를 통해 미들웨어 함수를 어플리케이션에 등록한다.

app.use((ctx, next) => {
    console.log(ctx.url);
    console.log(ctx.type);
    console.log(1);

    //url 파라미터 쿼리문이 다를 시 에러 발생
    //검색 (http://localhost:4000/?auth=1)
    if (ctx.query.auth !== '1') {
        ctx.status = 401; //unauth
        return;
    }
    next();
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

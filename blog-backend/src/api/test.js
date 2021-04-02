const Router = require('koa-router');
const testApi = new Router();

testApi.get('/coffee', (ctx) => {
    ctx.body = 'coffee 성공';
});

module.exports = testApi;

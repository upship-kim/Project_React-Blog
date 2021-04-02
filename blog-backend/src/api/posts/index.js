const Router = require('koa-router');
const posts = new Router();
const postsCtrl = require('./posts.ctrl');

posts.use();

const printInfo = (ctx) => {
    ctx.body = {
        method: ctx.method,
        path: ctx.path,
        params: ctx.params,
    };
};

//REST API
posts.get('/', postsCtrl.list); //조회
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.read);
posts.delete('/:id', postsCtrl.remove);
posts.put('/:id', postsCtrl.replace);
posts.patch('/:id', postsCtrl.update);

module.exports = posts;

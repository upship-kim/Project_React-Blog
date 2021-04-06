import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedin';
const posts = new Router();

// //REST API list (url, 미들웨어, mongoose model)
// posts.get('/', postsCtrl.checkObjectId, postsCtrl.list); //조회
// posts.post('/', postsCtrl.write);
// posts.get('/:id', postsCtrl.read);
// posts.delete('/:id', postsCtrl.remove);
// posts.patch('/:id', postsCtrl.update);

//리팩토리 버전
posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

const post = new Router();
post.get('/', postsCtrl.read);
post.delete('/', checkLoggedIn, postsCtrl.remove);
post.patch('/', checkLoggedIn, postsCtrl.update);

posts.use('/:id', postsCtrl.checkObjectId, post.routes());

export default posts;

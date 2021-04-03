import Post from '../../models/post';

/* 
    POST /api/posts
    {
        title : '제목',
        body : '내용',
        tags : ['태그1', '태그2']
    }
*/

//Post 모델의 함수는 promise를 반환하기 때문에 async/await 문법에 기반하여 작성한다.

export const write = async (ctx) => {
    const { title, body, tags } = ctx.request.body;

    //모델의 인스턴스를 만들때는 new 키워드를 사용한다. 그리고 생성자 함수의 파라미터에 정보를 지닌 객체를 넣는다
    const post = new Post({
        title,
        body,
        tags,
    });
    try {
        await post.save();
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const list = async (ctx) => {
    try {
        const posts = await Post.find().exec();
        ctx.body = posts;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const read = async (ctx) => {
    const { id } = ctx.params;

    try {
        const post = await Post.findById(id).exec(); //편하네 ~~
        if (!post) {
            ctx.status = 404; //not Found
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const remove = async (ctx) => {
    const { id } = ctx.params;

    try {
        const post = await Post.findByIdAndRemove(id).exec();
        ctx.status = 204; //No content (성공하기는 했지만 응답할 데이터는 없음)
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const update = async (ctx) => {
    const { id } = ctx.params;

    try {
        //findByIdAndUpdate(id, 업데이트 내용, 업데이트 옵션)
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true,
        }).exec();
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

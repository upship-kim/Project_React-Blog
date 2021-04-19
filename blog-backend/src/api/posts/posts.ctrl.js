import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi'; //Request Body 검증
import sanitizeHtml from 'sanitize-html';
/*
    ObjectId 검증 미들웨어
*/
//mongoose Type중 ObjectId Type을 비구조화 할당
const { ObjectId } = mongoose.Types;

//미들 웨어 작성
export const getPostById = async (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
        ctx.status = 400; //Client 쪽에서 잘못된 요청을 했다
        return;
    }
    try {
        const post = await Post.findById(id);
        //post가 존재하지 않을때
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.state.post = post;
        return next();
    } catch (e) {
        ctx.throw(500, e);
    }
    // //검증에 오류가 없다면 next
    // return next();
};

//내가 쓴 포스트인지 확인하기 (for 수정, 삭제)
export const checkOwnPost = (ctx, next) => {
    const { user, post } = ctx.state;
    if (post.user._id.toString() !== user._id) {
        ctx.status = 403;
        return;
    }
    return next();
};

/* 
    POST /api/posts
    {
        title : '제목',
        body : '내용',
        tags : ['태그1', '태그2']
    }
*/

//Post 모델의 함수는 promise를 반환하기 때문에 async/await 문법에 기반하여 작성한다.
const sanitizeOption = {
    allowedTags: [
        'h1',
        'h2',
        'b',
        'i',
        'u',
        's',
        'p',
        'ul',
        'ol',
        'li',
        'blockquote',
        'a',
        'img',
    ],
    allowedAttributes: {
        a: ['href', 'name', 'target'],
        img: ['src'],
        li: ['class'],
    },
    allowedSchemes: ['data', 'http'],
};

export const write = async (ctx) => {
    const schema = Joi.object().keys({
        //객체가 다음 필드를 가지고 있음을 검증
        title: Joi.string().required(), //required()가 있으면 필수 항목
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
    });

    //검증 하고 나서 검증 실패인 경우 에러 처리
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400; //bad request
        ctx.body = result.error;
        return;
    }

    const { title, body, tags } = ctx.request.body;

    //모델의 인스턴스를 만들때는 new 키워드를 사용한다. 그리고 생성자 함수의 파라미터에 정보를 지닌 객체를 넣는다
    const post = new Post({
        title,
        body: sanitizeHtml(body, sanitizeOption),
        tags,
        user: ctx.state.user,
    });
    try {
        await post.save();
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

//+ username/tags 로 포스트 필터링 하기 (+검색기능)
/*
    GET /api/posts?username=&tag=&pa
*/

const removeHtmlAndShorten = (body) => {
    const filtered = sanitizeHtml(body, {
        allowedTags: [],
    });
    return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

export const list = async (ctx) => {
    //다음페이지 기능 구현
    //query문은 string이기 때문에 parseInt를 사용하여 숫자로 변환해준다.
    //parseInt(string, radix(:10진수 뭐 이런거))
    const page = parseInt(ctx.query.page || '1', 10);
    if (page < 1) {
        ctx.status = 400;
        return;
    }

    const { tag, username } = ctx.query;
    //url 쿼리에 tag, username값이 있다면 객체 안에 넣고, 그렇지 않으면 넣지 않음
    console.log(tag, username);
    const query = {
        ...(username ? { 'user.username': username } : {}),
        ...(tag ? { tags: tag } : {}),
    };

    try {
        const posts = await Post.find(query)
            .sort({ _id: -1 }) //역순 정렬
            .limit(10) //한페이지에서 보여줄 수 있는 post 수
            .skip((page - 1) * 10) //다음 페이지에서 보여줄 수 있는 페이지 수 (괄호 안에 숫자만큼 제외하고 보여준다 )
            .lean() // lean함수를 쓰면 mongoose 문서 인스턴스의 데이터를 JSON으로 변환한다
            .exec();

        //마지막 페이지 번호 알려주기
        const postCount = await Post.countDocuments(query).exec(); //문서의 총 개수 알려주기 (총 몇개의 post인지 )
        ctx.set('Last-Page', Math.ceil(postCount / 10));
        ctx.body = posts.map((post) => ({
            ...post,
            body: removeHtmlAndShorten(post.body),
        }));
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const read = (ctx) => {
    ctx.body = ctx.state.post;
};

export const remove = async (ctx) => {
    const { id } = ctx.params;

    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204; //No content (성공하기는 했지만 응답할 데이터는 없음)
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const update = async (ctx) => {
    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array().items(Joi.string()),
    });

    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const nextData = { ...ctx.request.body };
    if (nextData.body) {
        nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
    }

    const { id } = ctx.params;

    try {
        //findByIdAndUpdate(id, 업데이트 내용, 업데이트 옵션)
        const post = await Post.findByIdAndUpdate(id, nextData, {
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

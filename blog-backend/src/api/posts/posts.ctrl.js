// route 컨트롤러 작성

let postId = 1; //id의 초깃값입니다.

//post 배열 초기 데이터
const posts = [
    {
        id: 1,
        title: '제목',
        body: '내용',
    },
];
////////////

/*
    포스트 작성
    POST /api/posts
    {title, body}
*/

//export.함수 이름 지정
export const write = (ctx) => {
    //Rest API의 Request Body는 ctx.request.body 에서 조회 가능
    const { title, body } = ctx.request.body;
    postId += 1;
    const post = { id: postId, title, body };
    posts.push(post);
    ctx.body = post;
};
/////////////////////

/* 
    포스트 목록 조회
    GET /api/posts
*/

export const list = (ctx) => {
    ctx.body = posts;
};
///////////////////////

/* 
    특정 포스트 조회 
    GET /api/posts/:id
*/

export const read = (ctx) => {
    const { id } = ctx.params;
    //id값으로 특정 포스트를 검색
    //파라미터로 받아온 값은 문자열 형식이므로 파라미터를 숫자로 변환하거나
    //비교할 p.id값을 문자열로 변경해야함

    const post = posts.find((p) => p.id.toString() === id);

    //조건문으로 id가 없으면 오류를 생성/반환함
    if (!post) {
        ctx.status = 404;
        ctx.body = { message: '아이디가 없습니다. ' };
        return;
    }
    ctx.body = post;
};

/*
    특정 포스트 제거
    DELETE /api/posts/:id
*/

export const remove = (ctx) => {
    const { id } = ctx.params;
    //해당 id를 가진 posts가 몇 번째인지 확인한다. ( 추후 splice 함수를 쓰기 위함)

    const index = posts.findIndex((p) => p.id.toString() === id);

    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        };
        return;
    }

    posts.splice(index, 1);
    ctx.status = 204; //No Content
};
/////////////////

/*
    특정 포스트 수정(교체)
    PUT /api/posts/:id
    {title, body}
*/

export const replace = (ctx) => {
    const { id } = ctx.params;
    const { title, body } = ctx.request.body;

    const index = posts.findIndex((p) => p.id.toString() === id); //배열 안에서 수정해야함(그러니까 index를 찾아야함)
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        };
        return;
    }
    posts[index] = {
        id,
        title,
        body,
    }; //또는 posts[index] = {...id, ctx.request.body} 로 해도 됌
    ctx.body = posts[index];
};
/////////////////

/*
    특정 포스트 수정(특정 필드 교체)
    PATCH /api/posts/:id
    {title, body}
*/

export const update = (ctx) => {
    const { id } = ctx.params;

    const index = posts.findIndex((p) => p.id.toString() === id); //배열 안에서 수정해야함(그러니까 index를 찾아야함)
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        };
        return;
    }
    posts[index] = {
        ...posts[index],
        ...ctx.request.body,
    }; // 불변성을 지켜준다 !! 그리고 뭘 변환했는지 모르니까 요청 그대로를 넣는다
    ctx.body = posts[index];
};

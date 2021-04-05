//auth관련 라우터 처리 함수 모음 컨트롤러
import User from '../../models/user';
import Joi from 'joi';

/*
    POST /api/auth/register
    {
        username : 'velopert',
        password : 'mypass123'
    }
*/
export const register = async (ctx) => {
    //Request Body 검증하기 (with joi)
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().required(),
    });
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { username, password } = ctx.request.body;
    try {
        //username이 이미 존재하는지 확인
        const exists = await User.findByUsername(username);
        if (exists) {
            ctx.status = 409; //Conflict
            return;
        }

        //username 먼저 넣고 password는 암호화가 필요하니 만들어둔 인스턴스 메서드 활용
        const user = new User({
            username,
        });

        await user.setPassword(password); // 비밀번호 설정
        await user.save(); //데이터베이스에 저장

        //응답할 데이터에서 hashedPassword 필드 제거
        const data = user.toJSON();
        console.log('data', data);
        delete data.hashedPassword;
        ctx.body = data;
    } catch (e) {
        ctx.throw(500, e);
    }

    //회원가입
};
export const login = async (ctx) => {
    //로그인
};
export const check = async (ctx) => {
    //로그인 상태 확인
};
export const logout = async (ctx) => {
    //로그아웃
};

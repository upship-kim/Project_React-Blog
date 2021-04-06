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
        ctx.body = user.serialize();

        //JWT 검증 후, token 생성하기
        const token = user.generateToken(); //this user에서 UserSchema generateToken 검증
        ctx.cookies.set('access_token', token, {
            //token 명, 생성할 token정보, token 유효기간 설정
            maxAge: 1000 * 60 * 60 * 24 * 7, //최대 7일
            httpOnly: true,
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    //회원가입
};
export const login = async (ctx) => {
    //로그인
    const { username, password } = ctx.request.body;

    //아이디 또는 비밀번호가 없을때
    if (!username || !password) {
        ctx.status = 401;
        console.log('등록된 정보가 없음');
        return;
    }

    try {
        const user = await User.findByUsername(username); //유저의 정보를 가져옴
        const vaild = await user.checkPassword(password); //가져온 유저 정보의 비밀번호 체크
        if (!vaild) {
            ctx.status = 401;
            return;
        }
        console.log(vaild);
        ctx.body = user.serialize(); //유저정보를 보여줌(비밀번호 제외)

        const token = user.generateToken(); //this user에서 UserSchema generateToken 검증
        ctx.cookies.set('access_token', token, {
            //token 명, 생성할 token정보, token 유효기간 설정
            maxAge: 1000 * 60 * 60 * 24 * 7, //최대 7일
            httpOnly: true,
        });
    } catch (e) {
        ctx.throw(500, e);
    }
};
export const check = async (ctx) => {
    //로그인 상태 확인
};
export const logout = async (ctx) => {
    //로그아웃
};

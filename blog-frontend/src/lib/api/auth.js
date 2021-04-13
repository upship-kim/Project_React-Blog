import client from '../api/client';

//로그인
export const login = ({ username, password }) => {
    return client.post('/api/auth/login', { username, password }); //proxy 설정을 localhost 4000으로 했기에 서버로 요청이 들어감
};

//회원가입
export const register = ({ username, password }) => {
    return client.post('/api/auth/register', { username, password });
};

//로그인 상태 확인
export const check = () => client.get('/api/auth/check');

//로그아웃
export const logout = () => client.post('/api/auth/logout');

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palatte';
import Button from '../common/Button';

/*
    회원가입 또는 로그인 폼을 보여줌
*/

const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
    button {
        margin-top: 1rem;
    }
`;

/*
    스타일링 input
*/
const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;

    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top: 1rem;
    }
`;

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover {
            color: ${palette.gray[9]};
        }
    }
`;

const ButtonTopMargin = styled(Button)`
    margin-top: 1rem;
`;

//autoComplete = 자동완성 입력 필드

//재사용 가능한 컴포넌트로 만들기
const textMap = {
    login: '로그인',
    register: '회원가입',
};

const AuthForm = ({ type, form, onChange, onSubmit }) => {
    const text = textMap[type];
    console.log('form', form);
    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <StyledInput
                    autoComplete="username"
                    name="username"
                    placeholder="아이디"
                    onChange={onChange}
                    value={form.username}
                />
                <StyledInput
                    autoComplete="new-password"
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                    onChange={onChange}
                    value={form.password}
                />
                {/* type 값에 따라 register일때 암호확인창 하나 더 생성  */}
                {type === 'register' && (
                    <StyledInput
                        autoComplete="new-password"
                        name="passwordConfirm"
                        placeholder="비밀번호 확인"
                        type="password"
                        onChange={onChange}
                        value={form.passwordConfirm}
                    />
                )}

                {/* Button 태그 뒤로 입력하면 props 값으로 넘어감 (<Button fullWidth={true} cyan={true}/> 와 같은 의미) */}
                <ButtonTopMargin fullWidth cyan>
                    {text}
                </ButtonTopMargin>
            </form>
            <Footer>
                {type === 'login' ? (
                    <Link to="/register">회원가입</Link>
                ) : (
                    <Link to="/login">로그인</Link>
                )}
            </Footer>
        </AuthFormBlock>
    );
};

export default AuthForm;

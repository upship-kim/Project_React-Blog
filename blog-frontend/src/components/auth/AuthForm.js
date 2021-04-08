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

//autoComplete = 자동완성 입력 필드

const AuthForm = () => {
    return (
        <AuthFormBlock>
            <h3>로그인</h3>
            <form>
                <StyledInput
                    autoComplete="username"
                    name="username"
                    placeholder="아이디"
                />
                <StyledInput
                    autoComplete="new-password"
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                />
                {/* Button 태그 뒤로 입력하면 props 값으로 넘어감  */}
                <Button fullWidth cyan>
                    로그인
                </Button>
            </form>
            <Footer>
                <Link to="/register">회원가입</Link>
            </Footer>
        </AuthFormBlock>
    );
};

export default AuthForm;

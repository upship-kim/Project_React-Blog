import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palatte';

const ButtonStyle = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;

    background: ${palette.gray[8]};
    &:hover {
        background: ${palette.gray[6]};
    }

    &:disabled {
        background: ${palette.gray[3]};
        color: ${palette.gray[5]};
        cursor: not-allowed;
    }

    ${(props) =>
        props.fullWidth &&
        css`
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            width: 100%;
            font-size: 1.125rem;
        `}
    ${(props) =>
        props.cyan &&
        css`
            background: ${palette.cyan[6]};
            &:hover {
                background: ${palette.cyan[4]};
            }
        `}
`;

const StyledButton = styled.button`
    ${ButtonStyle}// 버튼 CSS 적용
`;

const StyledLink = styled(Link)`
    ${ButtonStyle}
`;

// Button에 넣는 이유는 다른 컴포넌트에서 자동으로 import 되게끔하려고 ! (styled-components로 만든 컴포넌트는 자동 import가 안됨)
//{...props} : Button 이 받아오는 모든 props를 넣어주겠다란 의미
const Button = (props) => {
    return props.to ? <StyledLink {...props} /> : <StyledButton {...props} />;
};

export default Button;

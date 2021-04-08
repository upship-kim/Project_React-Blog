import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palatte';

const StyledButton = styled.button`
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

    ${(props) =>
        props.fullWidth &&
        css`
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            width: 100%;
            font-size: 1.125rem;
        `}
    ${(props) =>
        props.cyan &&
        css`
            background: ${palette.cyan[8]};
            &:hover {
                background: ${palette.cyan[6]};
            }
        `}
`;

// Button에 넣는 이유는 다른 컴포넌트에서 자동으로 import 되게끔하려고 ! (styled-components로 만든 컴포넌트는 자동 import가 안됨)
//{...props} : Button 이 받아오는 모든 props를 넣어주겠다란 의미
const Button = (props) => <StyledButton {...props} />;

export default Button;

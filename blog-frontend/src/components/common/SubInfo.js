import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palatte';
import { Link } from 'react-router-dom';

const SubInfoBlock = styled.div`
    /* hasMarginTop prop이 있을 경우 여백을 준다 */
    ${(props) =>
        props.hasMarginTop &&
        css`
            margin-top: 1rem;
        `}
    color: ${palette.gray[6]};

    /* span 사이에 가운데 점 보여주기 */
    span + span::before {
        color: ${palette.gray[4]};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7';
    }
`;

const SubInfo = ({ hasMarginTop, username, publishedDate }) => {
    return (
        <SubInfoBlock>
            <span>
                <b>
                    <Link to={`/@${username}`}>{username}</Link>
                </b>
            </span>
            <span>{new Date(publishedDate).toLocaleDateString()}</span>
        </SubInfoBlock>
    );
};

export default SubInfo;

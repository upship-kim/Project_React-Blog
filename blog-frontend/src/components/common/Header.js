import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';

const HeaderBlock = styled.div`
    position: fixed;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

/*
    Responsive 컴포넌트 를 활용하고 추가 스타일 적용 하여 새로운 컴포넌트 생성
*/

const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
    }
    .right {
        display: flex;
        align-items: center;
    }
`;

const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
`;

/*
    헤더가 fixed로 되어있기에 컨텐츠와 겹칠 수 있음, 그러므로 공백을 둠 
*/

const Spacer = styled.div`
    height: 4rem;
`;

const Header = ({ user, onLogout }) => {
    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <div className="logo">REACTER</div>
                    {user ? (
                        <div className="right">
                            <UserInfo>{user.username}</UserInfo>
                            <Button onClick={onLogout}>로그아웃</Button>
                        </div>
                    ) : (
                        <div className="rigth">
                            <Button to="/login">로그인</Button>
                        </div>
                    )}
                </Wrapper>
            </HeaderBlock>
            <Spacer />
        </>
    );
};

export default Header;

import React from 'react';
import PostList from '../components/post/PostList';
import HeaderContainer from '../container/common/HeaderContainer';

const PostListPage = () => {
    return (
        <>
            <HeaderContainer />
            <PostList />
        </>
    );
};

export default PostListPage;

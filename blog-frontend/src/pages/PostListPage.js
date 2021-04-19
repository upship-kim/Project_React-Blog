import React from 'react';
import HeaderContainer from '../container/common/HeaderContainer';
import PaginationContainer from '../container/posts/PaginationContainer';
import PostsListContainer from '../container/posts/postsListContainer';

const PostListPage = () => {
    return (
        <>
            <HeaderContainer />
            <PostsListContainer />
            <PaginationContainer />
        </>
    );
};

export default PostListPage;

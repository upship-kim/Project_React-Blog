import React from 'react';
import Pagination from '../../components/post/Pagination';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { useSelector } from 'react-redux';

const PaginationContainer = ({ location, match }) => {
    const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
        posts: posts.posts,
        lastPage: posts.lastPage,
        loading: loading['posts/LIST_POSTS'],
    }));

    //포스트가 없거나 로딩중이면 보여주지 않음 ~
    if (!posts || loading) return null;

    const { username } = match.params;

    //page가 없으면 초기값으로 1을 설정
    const { tag, page = 1 } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    return (
        <Pagination
            tag={tag}
            username={username}
            page={parseInt(page, 10)}
            lastPage={lastPage}
        />
    );
};

export default withRouter(PaginationContainer);

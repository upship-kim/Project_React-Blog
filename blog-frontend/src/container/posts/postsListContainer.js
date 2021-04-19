import React, { useEffect } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostList from '../../components/post/PostList';
import { listPosts } from '../../modules/posts';

const PostsListContainer = ({ location, match }) => {
    //처음 마운트 될 때 포스트 읽기 api 요청

    const dispatch = useDispatch();
    const { posts, error, loading, user } = useSelector(
        ({ posts, loading, user }) => ({
            posts: posts.posts,
            error: posts.error,
            loading: loading['posts/LIST_POSTS'],
            user: user.user,
        }),
    );

    useEffect(() => {
        const { username } = match.params;
        const { tag, page } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        dispatch(listPosts({ tag, username, page }));
    }, [dispatch, location.search]);

    return (
        <PostList
            loading={loading}
            error={error}
            posts={posts}
            showWriteButton={user}
        />
    );
};

export default withRouter(PostsListContainer);

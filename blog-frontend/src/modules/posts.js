import { createAction, handleAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const LIST_POSTS = 'posts/LIST_POSTS';
const LIST_POSTS_SUCCESS = 'posts/LIST_POSTS_SUCCESS';
const LIST_POSTS_FAILURE = 'posts/LIST_POSTS_FAILURE';

export const listPosts = createAction(
    LIST_POSTS,
    ({ tag, page, username }) => ({
        tag,
        page,
        username,
    }),
);

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);

const initialState = {
    posts: null,
    error: null,
};

const post = handleAction({
    [LIST_POSTS_SUCCESS]: (state, { payload: post }) => ({
        ...state,
        post,
    }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),
});

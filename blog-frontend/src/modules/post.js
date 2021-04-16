import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from '@redux-saga/core/effects';

//action타입 정의
const READ_POST = 'post/READ_POST';
const READ_POST_SUCCESS = 'post/READ_POST_SUCCESS';
const READ_POST_FAILURE = 'post/READ_POST_FAILURE';
const UNLOAD_POST = 'post/UNLOAD_POST';

//action 함수 정의
export const readPost = createAction(READ_POST, (id) => id);
export const unloadPost = createAction(UNLOAD_POST);

const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);

export function* postSaga() {
    yield takeLatest(READ_POST, readPostSaga);
}

//초기화 정의
const initialState = {
    post: null,
    error: null,
};

//reducer 생성
const post = handleActions(
    {
        [READ_POST_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post,
        }),
        [READ_POST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
        [UNLOAD_POST]: () => initialState,
    },
    initialState,
);

export default post;

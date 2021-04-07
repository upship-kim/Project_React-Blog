import React from 'react';
import { handleActions, createAction } from 'redux-actions';

//액션 타입 정의
const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';

//액션 함수 생성
export const sampleAction = createAction(SAMPLE_ACTION);

//초기값
const initialState = {};

//reducer 생성
const auth = handleActions(
    {
        [SAMPLE_ACTION]: (state, action) => state,
    },
    initialState,
);
export default auth;

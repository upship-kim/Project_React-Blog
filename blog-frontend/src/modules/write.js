import React from 'react';
import { createAction, handleActions } from 'redux-actions';

//action타입 정의
const INITIAILIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';

//action 함수 정의
export const initialize = createAction(INITIAILIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
    key,
    value,
}));

//초기화 정의
const initialState = {
    title: '',
    body: '',
    tags: [],
};

//reducer 생성
const write = handleActions(
    {
        [INITIAILIZE]: (state) => initialState,
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value,
        }),
    },
    initialState,
);

export default write;

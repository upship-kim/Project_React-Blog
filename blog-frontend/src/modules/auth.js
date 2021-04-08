import React from 'react';
import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

//액션 타입 정의
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

//액션 함수 생성
export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form, //login, register
        key, //username, password, passwordConfirm
        value, //바꾸려는 값
    }),
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

//초기값
const initialState = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    },
};

//reducer 생성
const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
            produce(state, (draft) => {
                draft[form][key] = value; //예 :state.register.username 을 바꾼다
            }),
        [INITIALIZE_FORM]: (state, { payload: { form } }) => ({
            ...state,
            [form]: initialState[form],
        }),
    },
    initialState,
);
export default auth;

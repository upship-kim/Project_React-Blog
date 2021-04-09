import React from 'react';
import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

//액션 타입 정의
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

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

export const register = createAction(REGISTER, ({ username, password }) => ({
    username,
    password,
}));
export const login = createAction(LOGIN, ({ username, password }) => ({
    username,
    password,
}));

//사가 생성 !!!!!
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(REGISTER, registerSaga);
}

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
    auth: null, //회원인증
    authError: null, //회원인증 에러
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
            authError: null, //폼 전환시 회원인증 에러 초기화
        }),

        //회원가입 성공
        [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth, //회원 정보가 들어감 (createRequestSaga.js에서 payload에 입력됨)
        }),
        //회원가입 실패
        [REGISTER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
        //로그인 성공
        [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth, //회원 정보
        }),
        //로그인 실패
        [LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
    },
    initialState,
);

export default auth;

import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

//액션 타입 정의
const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

//액션 함수 생성
export const startLoading = createAction(
    START_LOADING,
    (requestType) => requestType,
);

export const finishLoading = createAction(
    FINISH_LOADING,
    (requestType) => requestType,
);

//초기값
const initialState = {};

//reducer 생성
const loading = handleActions(
    {
        [START_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: true,
        }),

        [FINISH_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: false,
        }),
    },
    initialState,
);
export default loading;

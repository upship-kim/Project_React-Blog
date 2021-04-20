import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from './modules';
import createSagaMiddleware from 'redux-saga';
import { tempSetUser, check } from './modules/user';
import { HelmetProvider } from 'react-helmet-async';

const sagaMiddleware = createSagaMiddleware();

function loadUser() {
    try {
        const user = localStorage.getItem('user');
        console.log(user);
        if (!user) return;
        store.dispatch(tempSetUser(user));
        store.dispatch(check());
    } catch (e) {
        console.log('localStorage is not working');
    }
}

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import { Helmet } from 'react-helmet-async';

function App() {
    return (
        <>
            <Helmet>
                <title>REACTERS</title>
            </Helmet>
            <Route component={PostListPage} path={['/@:username', '/']} exact />
            <Route component={LoginPage} path="/login" />
            <Route component={PostPage} path="/@:username/:postId" />
            <Route component={RegisterPage} path="/register" />
            <Route component={WritePage} path="/writer" />
        </>
    );
}

export default App;

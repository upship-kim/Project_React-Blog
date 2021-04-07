import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';

function App() {
    return (
        <div>
            <Route component={PostListPage} path={['/@:username', '/']} exact />
            <Route component={LoginPage} path="/login" />
            <Route component={PostPage} path="/@:username/:postId" />
            <Route component={RegisterPage} path="/register" />
            <Route component={WritePage} path="/writer" />
        </div>
    );
}

export default App;

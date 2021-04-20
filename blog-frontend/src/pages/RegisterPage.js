import React from 'react';
import RegisterForm from '../container/auth/RegisterForm';
import AuthTemplate from '../components/auth/AuthTemplate';
import { Helmet } from 'react-helmet-async';

const RegisterPage = () => {
    return (
        <>
            <Helmet>
                <title>회원가입</title>
            </Helmet>
            <AuthTemplate>
                <RegisterForm />
            </AuthTemplate>
        </>
    );
};

export default RegisterPage;

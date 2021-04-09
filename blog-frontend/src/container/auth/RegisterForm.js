import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, register } from '../../modules/auth';
import { check } from '../../modules/user';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    //인풋 변경 이벤트 핸들러
    const onChange = (e) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value,
            }),
        );
    };

    //form 등록 이벤트 핸들러
    const onSubmit = (e) => {
        e.preventDefault();

        const { username, password, passwordConfirm } = form;
        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다. ');
            return;
        }
        dispatch(register({ username, password }));
    };

    useEffect(() => {
        console.log(initializeForm('register'));
        dispatch(initializeForm('register'));
    }, [dispatch]);

    //회원가입 성공/실패 처리
    useEffect(() => {
        if (authError) {
            console.log('오류 발생');
            console.log(authError);
            return;
        }
        if (auth) {
            console.log('회원가입 성공');
            console.log(auth);
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if (user) {
            console.log('check API 성공');
            console.log(user);
        }
    }, [user]);

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default RegisterForm;

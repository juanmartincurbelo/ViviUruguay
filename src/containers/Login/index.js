import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import WelcomeHeader from 'Components/WelcomeHeader';
import Form from 'Components/Form';

import { signIn } from 'Api/sessionApi';

import routes from 'Constants/routes';

import { setUserInfo } from 'Helpers';

import './style.scss';

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoading = useSelector(({ session: { isLoading } }) => isLoading);

    const onSubmit = async (data) => {
        await dispatch(signIn(data, (res) => {
            if (res?.data.data.email) {
                setUserInfo(res);
                history.push(routes.HOME);
            }
        }));
    };

    return (
        <div className="login">
            <WelcomeHeader />
            <Form onSubmit={onSubmit} isLoading={isLoading} />
        </div>
    );
};

export default Login;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Input from 'Components/Input';
import Button from 'Components/Button';

import routes from 'Constants/routes';

import './style.scss';

const Form = ({
  isSignUp = false,
  spanText = 'Dont`t you have an account yet?',
  linkText = 'SignUp',
  redirectTo = routes.SIGNUP,
  buttonText = 'Login',
  onSubmit,
  isLoading,
}) => {
  const { register, handleSubmit, formState: { isValid } } = useForm();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {isSignUp && (
        <Input
          label="Name"
          id="signup-name"
          name="name"
          type="text"
          register={register}
          required
        />
      )}
      <Input
        label="Email"
        id="login-signup-email"
        name="email"
        type="text"
        register={register}
        required
      />
      <Input
        label="Password"
        id="login-signup-password"
        name="password"
        type="password"
        register={register}
        required
      />
      {isSignUp && (
        <Input
          label="Password confirmation"
          id="signup-password-confirmation"
          name="password_confirmation"
          type="password"
          register={register}
          required
        />
      )}
      <Button text={buttonText} disabled={!isValid || isLoading} isLoading={isLoading} />
      <div className="form__redirect">
        <span>{spanText}</span>
        <Link className="form__redirect--link" to={redirectTo}>{linkText}</Link>
      </div>
    </form>
  );
};

Form.propTypes = {
  buttonText: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isSignUp: PropTypes.bool,
  linkText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
  spanText: PropTypes.string,
};

export default Form;

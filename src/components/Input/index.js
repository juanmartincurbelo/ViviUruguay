import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import './style.scss';

const Input = ({
  id,
  label,
  name,
  type,
  register,
  required,
}) => {
  const [showPassword, setShowPassword] = useState('password');

  const handleShowPassword = () => setShowPassword(showPassword === 'password' ? 'text' : 'password');

  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="input-button">
        <input
          className="input-button__input"
          id={id}
          type={type === 'password' ? showPassword : type}
          {...register(name, { required })}
        />
        {type === 'password' && (
          <button
            type="button"
            className="input-button__input--button"
            onClick={handleShowPassword}
          >{showPassword === 'password' ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default Input;

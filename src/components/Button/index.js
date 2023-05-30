import React from 'react';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';

import './style.scss';

const Button = ({
  text,
  disabled = false,
  isLoading = false,
  customClass = '',
  onClick = () => {},
}) => (
  <button
    className={`button ${customClass}`}
    disabled={disabled}
    onClick={onClick}
  >
    {isLoading ? <ClipLoader size={8} color="#fff" /> : text }
  </button>
);

Button.propTypes = {
  customClass: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Button;

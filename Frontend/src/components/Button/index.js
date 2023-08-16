import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Button = ({
  text,
}) => (
  <button className='button'>
    {text}
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

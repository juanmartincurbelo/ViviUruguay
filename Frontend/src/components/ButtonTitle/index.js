import React from 'react';
import PropTypes from 'prop-types';


import './style.scss';

const ButtonTitle = ({
  text,
}) => (
  <button className='button'>
    {text}
  </button>
);

export default ButtonTitle;

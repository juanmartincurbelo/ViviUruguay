/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import './style.scss';

const NotFound = () => (
  <div className="not-found">
    <h1 className="not-found__title">Oops!</h1>
    <p className="not-found__text">The page you are looking for doesn't exist.</p>
  </div>
);

export default NotFound;

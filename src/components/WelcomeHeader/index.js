import React from 'react';
import { HiOutlineNewspaper } from 'react-icons/hi';

import './style.scss';

const WelcomeHeader = () => (
  <div className="title">
    <HiOutlineNewspaper className="title__icon" />
    <span className="title__neoposts">
      <span className="title__neoposts--strong">NEO</span>POSTS
    </span>
  </div>
);

export default WelcomeHeader;

import "./style.scss";
import fondoImage from './img/fondo.jpg';

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from 'Containers/App';

document.documentElement.style.setProperty('--background-image-url', `url(${fondoImage})`);

ReactDOM.render(
    (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    ), document.getElementById('root')
);
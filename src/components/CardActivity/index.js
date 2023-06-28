import React from 'react';
import './style.scss'

const CardActivity = ({
    title,
    description,
    imageActivity
}) => {

    return (
        <div className="cardActivity">
            <div className="imgBx">
                <img src={imageActivity}></img>
            </div>
            <div className="introActivity">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default CardActivity;
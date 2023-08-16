import React from 'react';
import './style.scss'

const CardActivity = ({
    title,
    description,
    imageActivity,
    onClick
}) => {

    return (
        <div className="cardActivity" onClick={onClick}>
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
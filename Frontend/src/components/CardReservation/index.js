import React from 'react';
import './style.scss'

const CardReservation = ({
    title,
    imageActivity,
    name,
    date,
    hour,
    quantity,
    price
}) => {

    return (
        <div className="cardReservation">
            <div className="imgBx-reservation">
                <img src={imageActivity}></img>
            </div>
            <div className="introReservation">
                <h1>{title}</h1>
                <p>{name}</p>
                <p>{date}</p>
                <p>{hour}</p>
                <p>{quantity}</p>
                <p><span>{price}</span></p>
            </div>
        </div>
    );
};

export default CardReservation;
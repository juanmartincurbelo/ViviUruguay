import React from 'react';
import './style.scss'

const CardHome = ({
    title,
    description
}) => {

    return (
        <div className="containerHome">
            <div className="cardHome">
                <div className="contentHome">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default CardHome;
import React from 'react';
import './style.scss'

const CardDescription = ({
    title,
    description1stParagraph,
    description2ndParagraph,
    description3rdParagraph,
    description4thParagraph,
    description5thParagraph,
    description6thParagraph,
    description7thParagraph
}) => {

    return (
        <div className="container2">
            <div className="card2">
                <div className="content2">
                    <div className="details2">
                        <h2>{title}</h2>
                        <div className="data2">
                            <p>{description1stParagraph}</p>
                            <p>{description2ndParagraph}</p>
                            <p>{description3rdParagraph}</p>
                            <p>{description4thParagraph}</p>
                            <p>{description5thParagraph}</p>
                            <p>{description2ndParagraph}</p>
                            <p>{description6thParagraph}</p>
                            <p>{description7thParagraph}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDescription;
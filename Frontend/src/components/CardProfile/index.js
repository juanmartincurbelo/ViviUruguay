import React from 'react';
import './style.scss'

const CardProfile = ({
    profileImg,
    linkedinProfile,
    linkedinLogo,
    name,
    role,
    description
}) => {

    return (
        <div className="container">
            <div className="card">
                <div className="imgBx">
                    <img src={profileImg}></img>
                </div>

                <div className="content">
                    <div className="details">
                        <h2>
                            {name}
                            <br />
                            <span>
                                {role}
                            </span>
                        </h2>
                        <div className="data">
                            <h3>{description}</h3>
                        </div>
                        <div className="actionBtn">
                            <a href={linkedinProfile} target="_blank" rel="noopener noreferrer">
                                <img src={linkedinLogo} alt="LinkedIn" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProfile;
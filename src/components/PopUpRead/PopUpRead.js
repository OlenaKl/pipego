import React from "react";
import PropTypes from 'prop-types';
import noPhoto from '../../resources/no-photo.png';
import './styles.scss';

const PopUpRead = (props) => {
    const {
        person,
        onClose
    } = props;
    return (
        <div className="popup">
            <div className="popupContent">
                <div className="header">
                    <h3>Person's Information</h3>
                    <p onClick={onClose}>X</p>
                </div>
                <div className="photoContainer">
                    <div className="photo">
                        <img src={noPhoto} alt="" />
                    </div>
                    <div className="info">
                        <p className="name">{person.fullName}</p>
                        <p className="phone">{person.phone}</p>
                    </div>
                </div>
                <div className="moreDetails">
                    <div className="container">
                        <div className="label">Email:</div>
                        <div className="labelInfo">{person.email}</div>
                    </div>
                    <div className="container">
                        <div className="label">Organization:</div>
                        <div className="labelInfo">{person.organization}</div>
                    </div>
                    <div className="container">
                        <div className="label">Assistant:</div>
                        <div className="labelInfo">{person.assistant}</div>
                    </div>
                    <div className="container">
                        <div className="label">Groups:</div>
                        <div className="labelInfo">{person.group}</div>
                    </div>
                    <div className="container">
                        <div className="label">Location:</div>
                        <div className="labelInfo">{person.organizationAddress}</div>
                    </div>
                </div>
                <div className="footer">
                    <button onClick={onClose} className="button">Back</button>
                </div>
            </div>
            <div className="overlay" />
        </div>
    )
}

PopUpRead.propTypes = {
    person: PropTypes.object,
    onClose: PropTypes.func
}

export default PopUpRead;
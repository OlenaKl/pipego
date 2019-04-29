import React, { Component } from "react";
import PropTypes from 'prop-types';
import office from '../../resources/office.png';
import noPhoto from '../../resources/no-photo.png';
import './styles.scss';

export default class Person extends Component {
    static propTypes = {
        person: PropTypes.object,
        delete: PropTypes.func,
        openModal: PropTypes.func
    }

    render() {
        const person = this.props.person;
        return (
            <div className="personContainer">
                <div className="person" onClick={() => this.props.openModal(person)}>
                    <div className="personalInfo">
                        <p className="personName">{person.fullName}</p>
                        <div className="company">
                            <img src={office} alt="" />
                        <p className="personName">{person.organization}</p>
                        </div>
                    </div>
                    <div className="photo">
                        <img src={noPhoto} alt="" />
                    </div>
                </div>
                <button className="delete" onClick={() => this.props.delete(person.id)}>X</button>
            </div>
        )
    }
}
import React, { Component } from "react";
import PropTypes from 'prop-types';

import DataService from '../../services/DataService';
import './styles.scss';

export default class PopUpWrite extends Component {
    static propTypes = {
        onClose: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            organizationAddress: '',
            organizationName: '',
            assistant: '',
            group: '',
            error: '',
            success: ''
        }
    }

    onChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    addOrganization = async () => {
        const organization = {
            name: this.state.organizationName,
            address: this.state.organizationAddress
        }
        const response = await DataService.addOrganization(organization);
        return response.data.id;
    }

    addClient = async (name, organizationId) => {
        let group = '7f375eb071faef1db981f65448ae496c515a6b16';
        let assistant = '977c7bc45a5fa1f73c28869ec87d33c5c2366008';
        const body = {
            [group]: this.state.group,
            [assistant]: this.state.assistant,
            name,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            phone: this.state.phone,
            email: this.state.group,
            org_id: organizationId
        }
        return await DataService.addClient(body);
    }

    onSubmit = async (event) => {
        event.preventDefault();
        let name = this.state.firstName + ' ' + this.state.lastName;
        if (name.length > 2
            && this.state.organizationName.length
            && this.state.organizationAddress.length) {
            this.addOrganization()
                .then((id) => this.addClient(name, id))
                .then(() => this.setState({ success: "User was added!"}))
                .catch(() => this.setState({ error: 'Something went wrong!'}));
            return;
        }
        this.setState({ error: 'Enter first name, last name and organization!' });
    }

    render() {
        return (
            <div className="popup">
                <div className="popupContent">
                    <div className="header">
                        <h3>Person's Information</h3>
                        <p onClick={this.props.onClose}>X</p>
                    </div>
                    <form className="addPerson" onSubmit={this.onSubmit}>
                            {!!this.state.error && <p className="error">{this.state.error}</p>}
                            {!!this.state.success && <p className="success">{this.state.success}</p>}
                        <div className="field">
                            <label>First name:</label>
                            <input type="text" required pattern="[A-Za-z0-9]{1,20}" name="firstName" value={this.state.firstName} onChange={this.onChange} />
                        </div>
                        <div className="field">
                            <label>
                                Last name:
                            </label>
                            <input type="text" required name="lastName" value={this.state.lastName} onChange={this.onChange} />
                        </div>
                        <div className="field">
                            <label>
                                Phone:
                            </label>
                            <input type="text" required name="phone" value={this.state.phone} onChange={this.onChange} />
                        </div>
                        <div className="field">
                            <label>
                                Email:
                            </label>
                            <input type="text" required name="email" value={this.state.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={this.onChange} />
                        </div>
                        <div className="field">
                            <label>
                                Organization:
                            </label>
                            <input type="text" required name="organizationName" value={this.state.organizationName} onChange={this.onChange} />
                        </div>
                        <div className="field">
                            <label>
                                Address of organization:
                            </label>
                            <input type="text" required name="organizationAddress" value={this.state.organizationAddress} onChange={this.onChange} />
                        </div>
                        <div className="field">
                            <label>
                                Assistant:
                            </label>
                            <input type="text" name="assistant" value={this.state.assistant} onChange={this.onChange} />
                        </div>
                        <div className="field">
                            <label>
                                Group:
                            </label>
                            <input type="text" name="group" value={this.state.group} onChange={this.onChange} />
                        </div>
                        <button type="submit" className="addClient">Submit</button>
                    </form>
                    <div className="footer">
                        <button onClick={this.props.onClose} className="button">Back</button>
                    </div>
                </div>
                <div className="overlay" />
            </div>
        )
    }
}
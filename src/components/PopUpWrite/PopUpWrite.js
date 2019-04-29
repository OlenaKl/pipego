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
            error: false
        }
    }

    onChange = (event) => {
        const name = event.target.name;
        this.setState({
        [name]: event.target.value
        });
    }

    addClient = async (event) => {
        event.preventDefault();
        let group = '7f375eb071faef1db981f65448ae496c515a6b16';
        let assistant = '977c7bc45a5fa1f73c28869ec87d33c5c2366008';
        let name = this.state.firstName + ' ' + this.state.lastName;
        if(name.length > 2) {
            const body = {
                [group]: this.state.group,
                [assistant]: this.state.assistant,
                name,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                phone: this.state.phone,
                email: this.state.group,
                //org_name: this.state.organizationName
            }
            console.log(body)
            let response = await DataService.addClient(body);
            return;
        } 

        this.setState({ error: true });
        
    }

    render() {
        return (
            <div className="popup">
                <div className="popupContent">
                    <div className="header">
                        <h3>Person's Information</h3>
                        <p onClick={this.props.onClose}>X</p>
                    </div>
                    <form className="addPerson" onSubmit={this.addClient}>
                        {this.state.error && <p className="error">Enter first name and last name</p>}
                        
                        <div className="field">
                            <label>First name:</label>
                            <input type="text" name="firstName" value={this.state.firstName} onChange={this.onChange} />
                        </div>
                        <div className="field">
                            <label>
                                Last name:
                            </label>
                            <input type="text" name="lastName" value={this.state.lastName} onChange={this.onChange} />
                        </div>
                        <div className="field">
                            <label>
                                Phone:
                            </label>
                            <input type="text" name="phone" value={this.state.phone} onChange={this.onChange} />
                        </div>
                        <div className="field">
                            <label>
                                Email:
                            </label>
                            <input type="text" name="email" value={this.state.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={this.onChange} />
                        </div>
                        <div className="field">
                            <label>
                                Organization:
                            </label>
                            <input type="text" name="organizationName" value={this.state.organizationName} onChange={this.onChange} />
                        </div>
                        <div className="field">
                            <label>
                                Address of organization:
                            </label>
                            <input type="text" name="organizationAddress" value={this.state.organizationAddress} onChange={this.onChange} />
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
                        <input type="submit" value="Submit" />
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
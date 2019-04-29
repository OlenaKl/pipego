import React, { Component } from "react";
import PropTypes from 'prop-types';
import './styles.scss';

import DataService from '../../services/DataService';

import Person from '../Person';
import PopUpRead from '../PopUpRead';

export default class Search extends Component {
    static propTypes = {
        hideSearchOnFocus: PropTypes.func,
        hideSearch: PropTypes.func,
        isActive: PropTypes.bool
    }

    constructor(props){
        super(props);
        this.state = {
            list: [],
            person: {},
            modalVisible: false
        }
    }

    openModal = async (person) => {
        const response = await DataService.getClientById(person.id);
        this.setState({
            person: response,
            modalVisible: true
        });
    }

    closeModal = () => {
        this.setState({
            person: {},
            modalVisible: false
        });
    }

    deletePerson = async (id) => {
        const list = this.state.list;
        const indexToDelete = this.state.list.findIndex(item => item.id === id);
        list.splice(indexToDelete, 1);
        this.setState({ list });
        await DataService.deleteClient(id);
    }

    search = async (event) => {
        if (event.target.value.length > 2) {
            const response = await DataService.searchForClient(event.target.value);
            this.setState({ list: response });
        }
    }

    renderResults = () => {
        return(
            <div className="results">
                {this.state.list.length > 0 ? this.state.list.map((person) => (
                    <Person
                        delete={this.deletePerson}
                        openModal={this.openModal}
                        person={person}
                        data-id={person.name}
                        key={person.id} />
                )) : <p>Enter name of a client</p>}
            </div>
        )
    }
    render() {
        return (
            <div className="search">
                <div className="searchField">
                    <input
                        placeholder="Search"
                        onFocus={this.props.hideSearchOnFocus} 
                        onBlur={this.props.hideSearchOnFocus}
                        onChange={this.search} />
                        {this.props.isActive && <span onClick={this.props.hideSearch}>X</span>}
                </div>
                { this.props.isActive && this.renderResults()}
                {this.state.modalVisible && <PopUpRead
                    person={this.state.person}
                    onClose={this.closeModal} />}
            </div>
        )
    }
}


import React, { Component } from "react";
import Sortable from 'react-sortablejs';

import DataService from '../../services/DataService';

import SearchField from '../SearchField';
import Pagination from '../Pagination';
import Person from '../Person';
import PopUpRead from '../PopUpRead';
import PopUpWrite from '../PopUpWrite';

import './styles.scss';

export default class ContactsList extends Component {
    state = {
        list: [],
        start: 0,
        limit: 10,
        activePage: 0,
        modalVisible: false,
        person: {},
        links: [1],
        next: true,
        addPersonVisible: false,
        searchActive: false
    }
    async componentDidMount() {
        await this.fetchRange(this.state.start);
    }

    fetchRange = async (start, index) => {
        let startFetch = start;
        let links = this.state.links;
        if (index) {
            startFetch = index * this.state.limit;
        }
        const response = await DataService.fetchClients(startFetch, this.state.limit)
        if (start > 9 && this.state.links.indexOf(response.nextStart / this.state.limit) === -1) {
            links.push(response.nextStart / this.state.limit);
        }
        this.setState({
            links,
            list: response.list,
            activePage: response.nextStart,
            next: response.next
        });
    }

    deletePerson = async (id) => {
        const list = this.state.list;
        const indexToDelete = this.state.list.find(item => item.id === id);
        list.splice(indexToDelete, 1);
        this.setState({ list });
        await DataService.deleteClient(id);
    }



    sortPersons = (a, b) => a.index - b.index;

    setNewOrder = (newIndex, oldIndex) => {
        const list = this.state.list;
        let itemToCSwap = list[oldIndex].index;
        list[oldIndex].index = list[newIndex].index;
        list[newIndex].index = itemToCSwap;
        list.sort(this.sortPersons);
        this.setState({ list });
    }

    openModal = (person) => {
        this.setState({
            person,
            modalVisible: !this.state.modalVisible
        });
    }

    addPerson = () => {

    } 

    hideSearchOnFocus = (event) => {
        if (event.target.value.length < 1) {
            this.setState({ searchActive: false });
        }
        this.setState({ searchActive: true });
    }

    hideSearch = () => {
        this.setState({ searchActive: false });
    }

    renderSearch = () => {
        return (
            <SearchField
                hideSearchOnFocus={this.hideSearchOnFocus}
                isActive={this.state.searchActive}
                hideSearch={this.hideSearch}
            />
        )
    }

    renderResults = () => {
        return (
            <div className="people">
                <Sortable
                    items={this.state.list}
                    onChange={(order, sortable, event) => this.setNewOrder(event.newIndex, event.oldIndex)}>
                    {this.state.list.map((person) => (
                        <Person
                            delete={this.deletePerson}
                            openModal={this.openModal}
                            person={person}
                            data-id={person.name}
                            key={person.id} />
                    ))}
                </Sortable>
                <Pagination
                    limit={this.state.limit}
                    links={this.state.links}
                    active={this.state.activePage}
                    next={this.state.next}
                    fetchRange={this.fetchRange} />

                {this.state.modalVisible && <PopUpRead person={this.state.person}
                    onClose={this.openModal} />}

                {this.state.addPersonVisible && <PopUpWrite
                    onClose={this.openModal} />}
            </div>
        )
    }

    render() {
        return (
            <div className="containerContacts">
                <h2>People's list</h2>
                {this.renderSearch()}
                {!this.state.searchActive && this.renderResults()}
            </div>
        )
    }
}
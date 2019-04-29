import UtilityService from "./UtilityService";
import Person from '../models/Person';
import PersonList from '../models/PersonList';

function clientDeserialize(person: Person) {
    const groupKey = '7f375eb071faef1db981f65448ae496c515a6b16';
    const assistant = '977c7bc45a5fa1f73c28869ec87d33c5c2366008';
    const order = '0230d373fff11c38df9ab45814947139a1124093';
    return new Person(
        person.id,
        person.email,
        person.name,
        person.phone,
        person.org_name,
        person.org_id,
        person.first_name,
        person.last_name,
        person[groupKey],
        person[assistant],
        person[order]
    )
}

function clientsListDeserialize(list: object) {
    return new PersonList(
        list.data.map(clientDeserialize),
        list.additional_data.pagination.more_items_in_collection,
        list.additional_data.pagination.next_start
    )
}

export default class DataService {
    static async fetchClients(start, limit) {
        const url = `/v1/persons?start=${start}&limit=${limit}`
        const response = await UtilityService.getRequest(url);
        const clients = clientsListDeserialize(response);
        return clients;
    }

    static async getClientById(id) {
        const url = `/v1/persons/${id}?`
        const response = await UtilityService.getRequest(url);
        const client = clientDeserialize(response.data);
        return client;
    }

    static async searchForClient(term) {
        const url = `/v1/persons/find?term=%2F${term}&start=0`
        const response = await UtilityService.getRequest(url);
        let clients = [];
        if(!!response.data) {
            clients = response.data.map(clientDeserialize);
        } 
        return clients;
    }

    static async deleteClient(id) {
        const url = `/v1/persons/${id}`;
        const response = await UtilityService.deleteRequest(url);
        return response;
    }

    static async addClient(person) {
        const url = `/v1/persons`;
        const response = await UtilityService.postRequest(url, person);
        return response;
    }

    static async addOrganization(organization) {
        const url = `/v1/organizations`;
        const response = await UtilityService.postRequest(url, organization);
        return response;
    }

    static async updateClientOrder(id, newOrder) {
        const order = '0230d373fff11c38df9ab45814947139a1124093';
        const data = {
            [order]: newOrder
        }
        const url = `/v1/persons/${id}`;
        const response = await UtilityService.putRequest(url, data);
        return response;
    }
}
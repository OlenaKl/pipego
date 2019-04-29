// @flow
import { baseURL, apiKey } from './config';

export default class UtilityService {
    static async getRequest(endpoint: string): object {
        const url = `${baseURL}${endpoint}&api_token=${apiKey}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const text = await response.text();
        return text ? JSON.parse(text) : {};
    }

    static async postRequest(endpoint: string, body: object = {}): object {
        const url = `${baseURL}${endpoint}?api_token=${apiKey}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const text = await response.text();
        return text ? JSON.parse(text) : {};

    }

    static async putRequest(endpoint: string, body: object = {}): object {
        const url = `${baseURL}${endpoint}?api_token=${apiKey}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const text = await response.text();
        return text ? JSON.parse(text) : {};
    }

    static async deleteRequest(endpoint: string, body: object = {}): object {
        const url = `${baseURL}${endpoint}?api_token=${apiKey}`
        
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const text = await response.text();
        return text ? JSON.parse(text) : {};
    }
}
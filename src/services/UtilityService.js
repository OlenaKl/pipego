// @flow
import { baseURL, apiKey } from './config';

let _rqNo = 1;
export default class UtilityService {
    static async getRequest(endpoint: string, limit?: string): Object {
        const rqNo = _rqNo++;
        console.log(`rq[${rqNo}] getRequest ${endpoint}`);
        const url = `${baseURL}${endpoint}?api_token=${apiKey}'&limit='${limit}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const text = await response.text();
        console.log(`rs[${rqNo}] getRequestBasic`, text);
        return text ? JSON.parse(text) : {};
    }

    static async postRequest(endpoint: string): Object {
        const rqNo = _rqNo++;
        console.log(`rq[${rqNo}] postRequest ${endpoint}`, body);
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
        console.log(`rs[${rqNo}] authPostRequestBasic`, text);
        return text ? JSON.parse(text) : {};

    }

    static async putRequest(endpoint: string): Object {
        const rqNo = _rqNo++;
        console.log(`rq[${rqNo}] authPutRequest ${endpoint}`, body);

        const url = `${baseURL}${endpoint}?api_token=${apiKey}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: `${UserStore.tokenType} ${UserStore.accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const text = await response.text();
        console.log(`rs[${rqNo}] authPutRequest`, text);
        return text ? JSON.parse(text) : {};
    }

    static async deleteRequest(endpoint: string): Object {
        const rqNo = _rqNo++;
        console.log(`rq[${rqNo}] authDeleteRequest ${endpoint}`, body);
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
        console.log(`rs[${rqNo}] authDeleteRequest`, text);
        return text ? JSON.parse(text) : {};
    }
}
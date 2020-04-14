import { ICompany, IDelivery } from "../interfaces";
import { DELETE, POST, PUT } from "./requestMethods";


export const deliveryService = {
    addNewDelivery,
    updateDeliveryData,
    deleteDeliveryData,
};

function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
}

function addNewDelivery(delivery: IDelivery, company: ICompany) {

    const requestOptions = {
        method: POST,
        headers: authHeaders(),
        body: JSON.stringify({
            name: delivery.name,
            nip: delivery.nip,
            address: {
                city: delivery.address.city,
                street: delivery.address.street,
                postalCode: delivery.address.postalCode,
            }
        })
    };
    return fetch(`/api/addNewDelivery/${company.nip}`, requestOptions)
        .then(res => res.json())
        .then(handleResponse);
}

function updateDeliveryData(delivery: IDelivery) {
    const requestOptions = {
        method: PUT,
        headers: authHeaders(),
        body: JSON.stringify({
            name: delivery.name,
            nip: delivery.nip,
            address: {
                city: delivery.address.city,
                street: delivery.address.street,
                postalCode: delivery.address.postalCode,
            }
        })
    };
    return fetch(`/api/updateDeliveryData`, requestOptions)
        .then(res => res.json())
        .then(handleResponse);
}

function deleteDeliveryData(delivery: IDelivery, company: ICompany) {
    const requestOptions = {
        method: DELETE,
        headers: authHeaders(),
    };
    return fetch(`/api/deleteDeliveryData/${delivery.nip}/${company.nip}`, requestOptions)
        .then(res => res.json())
        .then(handleResponse);
}
// @ts-ignore
function handleResponse(response) {
    if (response.status === "OK" || response.ok) {
        for (const dataKey in response.data) {
            if (dataKey === "jwtToken")
                localStorage.setItem(dataKey, response.data[dataKey]);
        }
        return response.data;
    } else {
        return Promise.reject(response.message);
    }
}
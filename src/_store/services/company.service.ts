import { ICompany } from "../interfaces";
import { POST } from "./requestMethods";


export const companyService = {
    deleteCompany,
    updateCompany
};


function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
}

function deleteCompany(companyId: number) {
    const requestOptions = {
        method: POST,
        headers: authHeaders(),
        body: JSON.stringify(companyId)
    };

    return fetch(`/api/company`, requestOptions)
        .then(res => res.json())
        .then(handleResponse);
}

function updateCompany(company: ICompany) {
    const requestOptions = {
        method: POST,
        headers: authHeaders(),
        body: JSON.stringify(company)
    };

    return fetch(`/api/authenticate`, requestOptions)
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
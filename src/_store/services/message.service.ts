import { POST, GET } from "./requestMethods";
import { IMessage } from "../interfaces";

export const messageService = {
    getMessageHistory,
    getUserList,
    sendMessage,
};

function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
}

function getMessageHistory(fromEmail: string, toEmail: string, fromDate: number) {
    const requestOptions = {
        method: GET,
        headers: authHeaders(),
    };

    return fetch(`/api/getMessagesByEmail?from=${fromEmail}&to=${toEmail}&fromDate=${fromDate}`, requestOptions)
        .then(res => res.json())
        .then(result => {
            handleResponse(result);
            return result.data as IMessage[]
        });
}


function getUserList(email: string) {
    const requestOptions = {
        method: GET,
        headers: authHeaders(),
    }

    return fetch(`/api/getUserList?email=${email}`, requestOptions)
        .then(res => res.json())
        .then(result => {
            handleResponse(result);
            return result.data as string[]
        });
}

function sendMessage(message: IMessage) {
    const requestOptions = {
        method: POST,
        headers: authHeaders(),
        body: JSON.stringify({ from: message.fromEmail, to: message.toEmail, msg: message.msg, date: message.date })
    };

    return fetch(`/api/saveToHistory`, requestOptions)
        .then(res => res.json())
        .then(result => {
            handleResponse(result);
            return result.data;
        });
}

// @ts-ignore
function handleResponse(result) {
    console.log(result.data);

    if (result.status === "OK") {
        if (result.data && result.data.size > 0) {
            return result.data
        }
        return []
    } else {
        if (result.errors.length > 0) {
            throw Error(result.errors[0].msg);
        }
        throw Error(result.status);
    }
}

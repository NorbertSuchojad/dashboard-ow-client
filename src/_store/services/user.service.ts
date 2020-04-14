import { ICompany, IUser, IUserData, IToken } from "../interfaces";
import { GET, POST, PUT } from "./requestMethods";

export const userService = {
    login,
    logout,
    resetPassword,
    updatePassword,
    savePassword,
    register,
    getAll,
    getById,
    getUserDataByToken,
    updateUserData,
    addNewCoworker,
    updateCoworker,
    unpinCoworker,
    getPosUsers,
};

function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
}

function register(user: IUser) {
    const requestOptions = {
        method: POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/api/registration`, requestOptions)
        .then(res => res.json())
        .then(handleResponse);
}

function resetPassword(email: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`/api/resetPassword?email=` + email, requestOptions).then(handleResponse);
}

function updatePassword(id: number, token: string) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`/api/updatePassword?id=` + id + `&token=` + token, requestOptions).then(handleResponse);
}

function savePassword(id: number, newPassword: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: id, newPassword: newPassword })
    };


    return fetch(`/api/savePassword`, requestOptions).then(handleResponse);
}

function login(user: IUser) {
    const requestOptions = {
        method: POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "email": user.email, "password": user.password })
    };

    return fetch(`/api/authenticate`, requestOptions)
        .then(response => response.json())
        .then(result => {
            handleNewResponse(result)
            return result.data as IToken;
        });
}

function logout() {
    localStorage.clear();
}

function getAll() {
    const requestOptions = {
        method: GET,
        headers: authHeaders(),
    };

    // @ts-ignore
    return fetch(`/api/users`, requestOptions).then(handleResponse);
}

function getById(id: number) {
    const requestOptions = {
        method: GET,
        headers: authHeaders(),
    };

    // @ts-ignore
    return fetch(`/api/users/${id}`, requestOptions).then(handleResponse);
}

function getUserDataByToken(id: string) {
    const requestOptions = {
        method: GET,
        headers: authHeaders()
    };
    return fetch(`/api/getUserData`, requestOptions)
        .then(res => res.json())
        .then(result => {
            handleNewResponse(result)
            return result.data as IUserData;
        })
        ;
    //.then(handleResponse);
}


function updateUserData(user: IUserData) {
    const requestOptions = {
        method: PUT,
        headers: authHeaders(),
        body: JSON.stringify(user)
    };

    // @ts-ignore
    return fetch(`/api/updateUserData`, requestOptions).then(handleResponse);
}

function getPosUsers(company: ICompany) {
    const requestOptions = {
        method: GET,
        headers: authHeaders()
    };

    // @ts-ignore
    return fetch(`/api/getPosUsers/${company.nip}`, requestOptions).then(handleResponse);
}

function addNewCoworker(user: IUser) {
    const u = { 'email': user.email, 'role': user.role.name, 'company': { 'nip': user.company?.nip } };
    const requestOptions = {
        method: POST,
        headers: authHeaders(),
        body: JSON.stringify(u)
    };
    return fetch(`/api/addNewEmployee`, requestOptions)
        // .then(handleResponse);
        .then(response => response.json())
        .then(result => {
            handleNewResponse(result)
        });
}

function updateCoworker(user: IUser) {
    const requestOptions = {
        method: PUT,
        headers: authHeaders(),
        body: JSON.stringify(user)
    };

    // @ts-ignore
    return fetch(`/api/updateEmployeeData`, requestOptions)
        .then(handleResponse);
}

function unpinCoworker(user: IUser, company: ICompany) {
    const requestOptions = {
        method: POST,
        headers: authHeaders()
    };
    // @ts-ignore
    return fetch(`/api/deleteEmployee/${user.email}/${company.nip}`, requestOptions)
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

// @ts-ignore
function handleNewResponse(result) {
    if (result.status === "OK") {
        if (result.data) {
            for (const dataKey in result.data) {
                if (dataKey === "jwtToken")
                    localStorage.setItem(dataKey, result.data[dataKey]);
            }
            return result.data
        }
    } else {
        if (result.errors.length > 0) {
            throw Error(result.errors[0].msg);
        }
        throw Error(result.status);
    }
}

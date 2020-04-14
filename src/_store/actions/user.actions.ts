import { userConstants } from '../constants/user.constants';
import { userService } from '../services/user.service';
import { history } from '../helpers/history';
import axios from "axios";
import { Dispatch } from 'redux';
import { ICompany, IPosUser, IToken, IUser, IUserData } from "../interfaces";
import { AlertAction, alertActions } from "./alert.actions";

export const userActions = {
    login,
    logout,
    register,
    activateAccount,
    getUserDataByToken,
    updateUserData,
    checkAuthentication,
    addNewCoworker,
    updateCoworker,
    unpinCoworker,
    getPosUsers,
    resetPassword,
    updatePassword,
    savePassword,
};

function login(user: IUser) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(user));

        userService.login(user)
            .then(value => {
                //@ts-ignore
                dispatch(success(value, "Zalogowano pomyślnie"));
            })
            .catch(reason => dispatch(failure(reason.toString())))
            ;
    };

    function request(user: IUser) {
        return { type: userConstants.LOGIN_REQUEST, user }
    }

    function success(token: IToken, message: string) {
        return { type: userConstants.LOGIN_SUCCESS, token, message }
    }

    function failure(message: string) {
        return { type: userConstants.LOGIN_FAILURE, message }
    }
}

function addNewCoworker(user: IUser, company: ICompany, userData: IUserData) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(user));

        userService.addNewCoworker(user)
            .then(value => {
                dispatch(success(userData, company));
            })
            .catch(reason => dispatch(failure(reason)))
            ;
    };

    function request(user: IUser) {
        return { type: userConstants.COWORKER_ADD_REQUEST, user }
    }

    function success(userData: IUserData, company: ICompany) {
        return { type: userConstants.COWORKER_ADD_SUCCESS, userData, company }
    }

    function failure(error: string) {
        return { type: userConstants.COWORKER_ADD_FAILURE, error }
    }
}

function updateCoworker(user: IUser) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(user));

        userService.updateCoworker(user)
            .then((user) => dispatch(success(user), user)
            );
    };

    function request(user: IUser) {
        return { type: userConstants.COWORKER_UPDATE_REQUEST, user }
    }

    function success(user: IUser) {
        return { type: userConstants.COWORKER_UPDATE_SUCCESS, user }
    }

    function failure(error: string) {
        return { type: userConstants.COWORKER_UPDATE_FAILURE, error }
    }
}

function unpinCoworker(user: IUser, company: ICompany) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(user));

        userService.unpinCoworker(user, company)
            .then(
                (user: IUser) => dispatch(success(), user),
            );
    };

    function request(user: IUser) {
        return { type: userConstants.COWORKER_UNPIN_REQUEST, user }
    }

    function success() {
        return { type: userConstants.COWORKER_UNPIN_SUCCESS }
    }

    function failure(error: string) {
        return { type: userConstants.COWORKER_UNPIN_FAILURE, error }
    }
}

function logout() {
    userService.logout();

    // @ts-ignore
    return dispatch => {
        dispatch(success("Wylogowano pomyślnie"));
        history.push('/');
    };

    function success(message: string) {
        return { type: userConstants.LOGOUT, message }
    }
}

function register(user: IUser) {

    // @ts-ignore
    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Pomyślnie zarejestrowano w systemie'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user: IUser) {
        return { type: userConstants.REGISTER_REQUEST, user }
    }

    function success() {
        return { type: userConstants.REGISTER_SUCCESS }
    }

    function failure(error: string) {
        return { type: userConstants.REGISTER_FAILURE, error }
    }
}

function activateAccount(token: string) {
    // @ts-ignore
    return axios.get(`http://localhost:8080/api/activate/${token}`, {
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            const data = response.data;
            if (response.status !== 200) {
                if (response.status === 401) {
                    // eslint-disable-next-line no-restricted-globals
                    location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            //return data
            return ((dispatch: Dispatch<AlertAction>) => {
                dispatch(alertActions.success("asd"))
            });
        }
        );

    function request(token: string) {
        return { type: userConstants.DELETE_REQUEST, token }
    }

    function success(token: string) {
        return { type: userConstants.DELETE_SUCCESS, token }
    }

    function failure(token: string, error: any) {
        return { type: userConstants.DELETE_FAILURE, token, error }
    }
}

function getUserDataByToken(jwtToken: string) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(jwtToken));
        userService.getUserDataByToken(jwtToken)
            .then(value => {
                dispatch(success(jwtToken, value, value.companies[0]));
            })
            .catch(reason => dispatch(failure(jwtToken, reason.toString())))
            ;
    };

    function request(id: string) {
        return { type: userConstants.GETONE_REQUEST, id }
    }

    function success(id: string, user: IUserData, selectedCompany: ICompany) {
        return { type: userConstants.GETONE_SUCCESS, id, user, selectedCompany }
    }

    function failure(id: string, error: any) {
        return { type: userConstants.GETONE_FAILURE, id, error }
    }
}

function updateUserData(user: IUserData) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(user));

        userService.updateUserData(user)
            .then(
                dispatch(success()),
            );
    };

    function request(user: IUserData) {
        return { type: userConstants.USERDATA_UPDATE_REQUEST, user }
    }

    function success() {
        return { type: userConstants.USERDATA_UPDATE_SUCCESS, user }
    }

    function failure(error: string) {
        return { type: userConstants.USERDATA_UPDATE_FAILURE, error }
    }
}

function getPosUsers(company: ICompany) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(company));

        userService.getPosUsers(company)
            .then(
                (posUsers) => dispatch(success(posUsers)),
            );
    };

    function request(company: ICompany) {
        return { type: userConstants.POSUSERS_GET_REQUEST, company }
    }

    function success(posUsers: IPosUser) {
        return { type: userConstants.POSUSERS_GET_SUCCESS, posUsers }
    }

    function failure(error: string) {
        return { type: userConstants.POSUSERS_GET_FAILURE, error }
    }
}

export function checkAuthentication() {
    const jwtToken = localStorage.getItem("jwtToken") as unknown as string;
    const creationDate = localStorage.getItem('creationDate') as unknown as number;
    const expirationDate = localStorage.getItem('expirationDate') as unknown as number;

    if (jwtToken) {
        // @ts-ignore
        return dispatch => {
            dispatch(success({
                jwtToken: jwtToken,
                creationDate: creationDate,
                expirationDate: expirationDate
            }));
            history.push("/home")
        }
    } else {
        // @ts-ignore
        return dispatch => {
            dispatch(failure("no token found"));
            // dispatch(alertActions.error("Proszę się zalogować"))
            history.push("/")
        }
    }

    function success(token: IToken) {
        return { type: userConstants.AUTH_SUCCESS, token }
    }

    function failure(message: string) {
        return { type: userConstants.AUTH_FAILURE, message }
    }
}


function resetPassword(email: string) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(email));

        userService.resetPassword(email)
            .then(
                res => {
                    dispatch(alertActions.success("Proszę sprawdzić pocztę"));
                    dispatch(success(res));
                    history.push('/login');
                },
                error => {
                    dispatch(alertActions.error("Coś poszło nie tak, spróbuj później"));
                    dispatch(failure(error));
                }
            );
    };

    function request(email: string) {
        return { type: userConstants.RESET_PASSWORD_REQUEST, email }
    }

    function success(message: string) {
        return { type: userConstants.RESET_PASSWORD_SUCCESS, message }
    }

    function failure(error: string) {
        return { type: userConstants.RESET_PASSWORD_FAILURE, error }
    }
}

function updatePassword(id: number, token: string) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(id, token));

        userService.updatePassword(id, token)
            .then(
                res => {
                },
                error => {
                    dispatch(alertActions.error(error));
                    history.push("/login");
                }
            );
    };

    function request(id: number, token: string) {
        return { type: userConstants.UPDATE_PASSWORD_REQUEST, id, token }
    }
}

function savePassword(id: number, newPassword: string) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(id, newPassword));

        userService.savePassword(id, newPassword)
            .then(
                res => {
                    dispatch(alertActions.success("Hasło zostało poprawnie zmienione"));
                    history.push("/login");
                },
                error => {
                    dispatch(alertActions.error("Coś poszło nie tak, spróbuj później"));
                    history.push("/login");
                }
            );
    };

    function request(id: number, token: string) {
        return { type: userConstants.UPDATE_PASSWORD_REQUEST, id, token }
    }
}

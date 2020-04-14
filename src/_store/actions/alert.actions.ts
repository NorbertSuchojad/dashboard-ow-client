import {CLEAR, ERROR, SUCCESS} from '../constants/alert.constants';

export const alertActions = {
    success,
    error,
    clear,

};

function success(message: string): IAlertSuccess {
    return {
        type: SUCCESS,
        message: message
    };
}

function error(message: string): IAlertError {
    return {
        type: ERROR,
        message: message
    };
}

function clear(): IAlertClear {
    return {
        type: CLEAR
    };
}


export interface IAlertSuccess {
    type: SUCCESS
    message: string
}

export interface IAlertError {
    type: ERROR,
    message: string
}

export interface IAlertClear {
    type: CLEAR,
}

export type AlertAction = IAlertSuccess | IAlertError | IAlertClear;
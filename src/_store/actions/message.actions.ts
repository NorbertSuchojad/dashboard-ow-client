import { IMessage } from "../interfaces";
import { messageService } from '../services/message.service';
import { messageConstants } from "../constants/message.constants";

export const messageActions = {
    getMessageHistory,
    getUserList,
    sendMessage,
};

function getMessageHistory(from: string, to: string, fromDate: number) {
    // @ts-ignore
    return dispatch => {
        // dispatch(request());

        messageService.getMessageHistory(from, to, fromDate)
            .then(value => {
                dispatch(success(value));
            })
            .catch(reason => dispatch(failure(reason.toString())))
            ;
    };

    function request() {
        return { type: messageConstants.GET_MESSAGES_REQUEST }
    }

    function success(messages: IMessage[]) {

        return { type: messageConstants.GET_MESSAGES_SUCCESS, messages }
    }

    function failure(message: string) {
        return { type: messageConstants.GET_MESSAGES_FAILURE, message }
    }
}



function getUserList(email: string) {
    // @ts-ignore
    return dispatch => {
        // dispatch(request());

        messageService.getUserList(email)
            .then(value => {
                //@ts-ignore
                dispatch(success(value));
            })
            .catch(reason => dispatch(failure(reason.toString())))
            ;
    };

    function request() {
        return { type: messageConstants.GET_USERSFORMESSAGE_REQUEST }
    }

    function success(users: any) {
        return { type: messageConstants.GET_USERSFORMESSAGE_SUCCESS, users }
    }

    function failure(message: string) {
        return { type: messageConstants.GET_USERSFORMESSAGE_FAILURE, message }
    }
}

function sendMessage(message: IMessage) {
    // @ts-ignore
    return dispatch => {
        // dispatch(request());

        messageService.sendMessage(message)
            .then(value => {
                //@ts-ignore
                dispatch(success(message));
            })
            .catch(reason => dispatch(failure(reason.toString())))
            ;
    };

    function request() {
        return { type: messageConstants.SEND_MESSAGES_REQUEST }
    }

    function success(message: IMessage) {
        return { type: messageConstants.SEND_MESSAGES_SUCCESS, message }
    }

    function failure(message: string) {
        return { type: messageConstants.SEND_MESSAGES_FAILURE, message }
    }
}
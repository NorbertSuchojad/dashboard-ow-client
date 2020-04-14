import { CLEAR, ERROR, SUCCESS } from "../constants/alert.constants";
import { userConstants } from "../constants/user.constants";
import { initialStateConstants, ISystemState } from "../interfaces";
import { companyConstants } from "../constants/company.constants";
import { messageConstants } from "../constants/message.constants";


// @ts-ignore
export function mainReducer(state: ISystemState = initialStateConstants.systemStateInit, action: any): ISystemState {
    switch (action.type) {

        // alerts
        case SUCCESS:
            return {
                ...state,
                showAlert: true,
                alert: {
                    type: SUCCESS,
                    message: action.message
                }

            };
        case ERROR:
            return {
                ...state,
                showAlert: true,
                alert: {
                    type: ERROR,
                    message: action.message
                },
            };
        case CLEAR:
            return {
                ...state,
                showAlert: false,
            };

        // users
        case userConstants.LOGIN_REQUEST:
            return {
                ...state
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                token: action.token,
                showAlert: true,
                alert: {
                    type: SUCCESS,
                    message: action.message
                }
            };
        case userConstants.AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                token: action.token,
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                showAlert: true,
                alert: {
                    type: ERROR,
                    message: action.message
                },
            };
        case userConstants.RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case userConstants.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false
            };
        case userConstants.LOGOUT:
            return {
                alert: {
                    type: SUCCESS,
                    message: action.message
                },
                currentCompanySelected: initialStateConstants.systemStateInit.currentCompanySelected,
                isAuthenticated: initialStateConstants.systemStateInit.isAuthenticated,
                permission: initialStateConstants.systemStateInit.permission,
                posUsers: initialStateConstants.systemStateInit.posUsers,
                provision: initialStateConstants.systemStateInit.provision,
                showAlert: initialStateConstants.systemStateInit.showAlert,
                token: initialStateConstants.systemStateInit.token,
                totalSale: initialStateConstants.systemStateInit.totalSale,
                totalSaleForLastHour: initialStateConstants.systemStateInit.totalSaleForLastHour,
                userData: initialStateConstants.systemStateInit.userData,
                messageHistory: initialStateConstants.systemStateInit.messageHistory,
                chatUsers: initialStateConstants.systemStateInit.chatUsers,
            };
        case userConstants.GETONE_SUCCESS:
            return {
                ...state,
                userData: action.user,
                permission: action.user.role,
                provision: action.user.provision,
                totalSale: action.user.totalSale,
                totalSaleForLastHour: action.user.totalSaleForLastHour,
                currentCompanySelected: action.selectedCompany,
            };
        case userConstants.GETONE_FAILURE:
        case userConstants.GETONE_REQUEST:
            return {
                ...state,
            };
        case userConstants.USERDATA_UPDATE_SUCCESS:
            return {
                ...state,
                userData: action.user
            };

        // company
        case companyConstants.UPDATE_SUCCESS:
        case companyConstants.UPDATE_FAILURE:
        case companyConstants.UPDATE_REQUEST:
            return {
                ...state
            };
        case companyConstants.SWITCH_SELECTION:
            return {
                ...state,
                currentCompanySelected: action.company
            };
        case userConstants.COWORKER_ADD_SUCCESS:
            return {
                ...state,
                userData: action.userData,
                currentCompanySelected: action.company,
            };
        case userConstants.COWORKER_ADD_FAILURE:
            return {
                ...state,
                showAlert: true,
                alert: {
                    type: ERROR,
                    message: action.error.message
                },
            };
        case messageConstants.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                messageHistory: action.messages
            };
        case messageConstants.SEND_MESSAGES_SUCCESS:
            state.messageHistory.push(action.message)
            return {
                ...state,
            };
        case messageConstants.GET_USERSFORMESSAGE_SUCCESS:
            return {
                ...state,
                chatUsers: action.users,
            }
        default:
            return {
                ...state
            };
    }


}

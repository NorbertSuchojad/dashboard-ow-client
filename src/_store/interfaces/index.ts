import { CLEAR, ERROR, SUCCESS } from "../constants/alert.constants";
import { IPermissionTypes, USER, ADMIN } from "../constants/permission.constants";
import { IPaypalRecipientType } from "../constants/paypal.constants";


export interface ISystemState {
    permission: IPermissionTypes,
    isAuthenticated: boolean,
    showAlert: boolean,
    alert: IAlert,
    loading?: boolean,
    token: IToken,
    userData: IUserData,
    currentCompanySelected: ICompany,
    posUsers: IPosUser[],
    provision: number,
    totalSale: number
    totalSaleForLastHour: number,
    messageHistory: IMessage[]
    chatUsers: IChatUser[],
}
export interface IChatUser {
    email: string
}

export interface IMessage {
    fromEmail: string,
    toEmail: string,
    date: number,
    msg: string,
}

export interface IAlert {
    type: SUCCESS | ERROR | CLEAR,
    message: string,
}

export interface IUserData {
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    companies: ICompany[],
    users: IUser[],
    paypalAccount?: IPaypalAccount,
    provision?: number,
    totalSale?: number
    totalSaleForLastHour?: number,
}

export interface IPaypalAccount {
    receiver: string,
    paypalRecipientType: IPaypalRecipientType,
}

export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    role: IRole,
    company?: ICompany | undefined
    provision: number,
    totalSale: number
}

export interface IPosUser {
    username: string,
}

export interface ICompany {
    category: string,
    nip: string,
    name: string,
    deliveries: IDelivery[],
    users: IUser[],
}

export interface IDelivery {
    category: string,
    name: string,
    nip: string,
    address: IAddress,
    company?: ICompany,
}

export interface IAddress {
    city: string,
    street: string,
    postalCode: string,
}


export interface IToken {
    jwtToken: string,
    expirationDate: number,
    creationDate: number,
}

export interface IResponse {
    alerts: IResponseArray[],
    data: any,
    errors: IResponseArray[],
    infos: IResponseArray[],
    status: "ERROR" | "OK",
}

interface IResponseArray {
    code: any,
    msg: string,
}

interface IRole {
    name: string;
}

const roleInit: IRole = {
    name: "WAITER",
};
const userInit: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    role: roleInit,
    provision: 0,
    totalSale: 0
};
const userDataInit: IUserData = {
    firstName: '',
    lastName: '',
    email: '',
    role: 'USER',
    companies: [],
    users: [],
};
const messageInit: IMessage = {
    fromEmail: '',
    toEmail: '',
    msg: '',
    date: 0
}
const systemStateInit: ISystemState = {
    permission: USER,
    userData: userDataInit,
    isAuthenticated: false,
    showAlert: false,
    alert: {
        type: CLEAR,
        message: ' '
    },
    token: {
        jwtToken: "",
        expirationDate: 0,
        creationDate: 0,
    },
    currentCompanySelected: {
        category: "",
        nip: "1234567890",
        name: "",
        deliveries: [],
        users: []
    },
    posUsers: [],
    totalSale: 0,
    totalSaleForLastHour: 0,
    provision: 0,
    messageHistory: [],
    chatUsers: []
};
const companyInit: ICompany = {
    category: "",
    nip: "",
    name: "",
    deliveries: [],
    users: []
};
const posUserInit: IPosUser = {
    username: '',
}

export const initialStateConstants = {
    userDataInit,
    systemStateInit,
    companyInit,
    userInit,
    posUserInit,
    messageInit
};

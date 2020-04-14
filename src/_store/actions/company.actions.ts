import {ICompany, IToken,} from "../interfaces";
import {alertActions} from "./alert.actions";
import {history} from "../helpers/history";
import {companyService} from "../services/company.service";
import {companyConstants} from "../constants/company.constants";
import {userActions} from "./user.actions";


export const companyActions = {
    deleteCompany,
    updateCompany,
    selectedCompanyChange
};


function deleteCompany(companyId: number) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(companyId));

        companyService.deleteCompany(companyId)
            .then(
                (success:any) => {
                    dispatch(success());
                    dispatch(alertActions.success("Usunięto pomyślnie"));
                    history.push('/home');
                },
                (error:any) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(companyId: number) {
        return {type: companyConstants.DELETE_REQUEST, companyId}
    }

    function success() {
        return {type: companyConstants.DELETE_SUCCESS}
    }

    function failure(error: string) {
        return {type: companyConstants.DELETE_FAILURE, error}
    }
}

function updateCompany(company: ICompany) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(company));

        companyService.updateCompany(company)
            .then(
                token => {
                    dispatch(success(token));
                    dispatch(alertActions.success("Pomyślnie zaktualizowano"));
                    history.push('/home');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(company: ICompany) {
        return {type: companyConstants.UPDATE_REQUEST, company}
    }

    function success(token: IToken) {
        return {type: companyConstants.UPDATE_SUCCESS, token}
    }

    function failure(error: string) {
        return {type: companyConstants.UPDATE_FAILURE, error}
    }
}

function selectedCompanyChange(company: ICompany) {
    userActions.getPosUsers(company)
    // @ts-ignore
    return dispatch => {
        dispatch(success(company));
    };

    function success(company: ICompany) {
        return {type: companyConstants.SWITCH_SELECTION, company}
    }
}

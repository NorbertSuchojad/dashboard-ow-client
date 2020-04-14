import {ICompany, IDelivery} from "../interfaces";
import {deliveryConstants} from "../constants/delivery.constants";
import {deliveryService} from "../services/delivery.service";


export const deliveryActions = {
    addNewDelivery,
    updateDeliveryData,
    deleteDeliveryData,
};


function addNewDelivery(delivery: IDelivery, company: ICompany) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(delivery));

        deliveryService.addNewDelivery(delivery, company)
            .then(
                (delivery: IDelivery) => dispatch(success(), delivery),
            );
    };

    function request(delivery: IDelivery) {
        return {type: deliveryConstants.ADD_DELIVERY_REQUEST, delivery}
    }

    function success() {
        return {type: deliveryConstants.ADD_DELIVERY_SUCCESS}
    }

    function failure(error: string) {
        return {type: deliveryConstants.ADD_DELIVERY_FAILURE, error}
    }
}

function updateDeliveryData(delivery: IDelivery) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(delivery));

        deliveryService.updateDeliveryData(delivery)
            .then(
                ((delivery: IDelivery) => {
                    dispatch(success(), delivery);
                    // eslint-disable-next-line no-restricted-globals
                    location.reload(true)
                }),
                ((error: any) => {
                    dispatch(failure(error.toString()));
                }),
            )
        ;
    };

    function request(delivery: IDelivery) {
        return {type: deliveryConstants.UPDATE_DELIVERY_REQUEST, delivery}
    }

    function success() {
        return {type: deliveryConstants.UPDATE_DELIVERY_SUCCESS}
    }

    function failure(error: string) {
        return {type: deliveryConstants.UPDATE_DELIVERY_FAILURE, error}
    }
}

function deleteDeliveryData(delivery: IDelivery, company: ICompany) {
    // @ts-ignore
    return dispatch => {
        dispatch(request(delivery));

        deliveryService.deleteDeliveryData(delivery, company)
            .then(
                (delivery: IDelivery) => dispatch(success(), delivery),
            );
    };

    function request(delivery: IDelivery) {
        return {type: deliveryConstants.DELETE_DELIVERY_REQUEST, delivery}
    }

    function success() {
        return {type: deliveryConstants.DELETE_DELIVERY_SUCCESS}
    }

    function failure(error: string) {
        return {type: deliveryConstants.DELETE_DELIVERY_FAILURE, error}
    }
}


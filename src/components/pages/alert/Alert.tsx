import React, {CSSProperties} from "react";
import {connect} from "react-redux";
import {alertActions} from "../../../_store/actions/alert.actions";
import {ISystemState} from "../../../_store/interfaces";
import CloseIcon from '@material-ui/icons/Close';
import {CLEAR, ERROR, SUCCESS} from "../../../_store/constants/alert.constants";
import {buttonStyle, error, success} from "./style";

interface IProps {
    type: SUCCESS | ERROR | CLEAR,
    message: string,
    showAlert: boolean,
    clearAlerts():void,
}

const Alert = (props: IProps) => {

    function alertType(): CSSProperties {
        if (props.type === SUCCESS) {
            return success;
        } else {
            return error;
        }
    }

    function handleClose() {
        props.clearAlerts();
    }

    return (
        <div>
            {props.showAlert &&
            <div style={success}>

                {props.message &&
                <section className={`alert`} style={alertType()} onClick={handleClose}>
                    {props.message}
                    <CloseIcon fontSize={"default"} style={buttonStyle}/>
                </section>
                }
            </div>
            }
        </div>
    );
};

const mapStateToProps = (state: ISystemState) => ({
    type: state.alert.type,
    message: state.alert.message,
    showAlert: state.showAlert
});

const mapDispatchToProps = {
    clearAlerts: alertActions.clear,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);


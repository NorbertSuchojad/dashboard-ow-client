import React from "react";
import {CircularProgress, Grid} from "@material-ui/core";
import {Container} from "reactstrap";
import {ICompany, IDelivery, ISystemState} from "../../../../../_store/interfaces";
import {connect} from "react-redux";
import AddNewDelivery from "./AddNewDelivery";
import SingleDelivery from "./SingleDelivery";
import {ADMIN, IPermissionTypes, MANAGER} from "../../../../../_store/constants/permission.constants";

interface IProps {
    currentCompany: ICompany,
    permission: IPermissionTypes,
}

const UserDeliveries = (props: IProps) => {
    const contentAllowed = props.permission === ADMIN || props.permission === MANAGER;

    if (props.currentCompany && props.currentCompany.deliveries)
        return (
            <Container fluid>
                <Grid container spacing={5}>
                    {props.currentCompany.deliveries.map((dy: IDelivery, id: number) => {
                        return (
                            <SingleDelivery key={id} delivery={dy}/>
                        )
                    })}
                    {
                        contentAllowed &&
                        <AddNewDelivery company={props.currentCompany}/>
                    }
                </Grid>
            </Container>
        );
    else {
        return (<div>
            <CircularProgress/>
        </div>)
    }
};

const mapStateToProps = (state: ISystemState) => ({
    currentCompany: state.currentCompanySelected,
    permission: state.permission,
});

const mapDispatch = {};

export default connect(mapStateToProps, mapDispatch)(UserDeliveries);

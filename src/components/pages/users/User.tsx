import React from "react";
import {Grid} from "@material-ui/core";
import {Row} from "reactstrap";
import UserDataEditForm from "./fragments/userData/UserDataForm";
import UserDeliveries from "./fragments/deliveries/UserDeliveries";
import {ISystemState} from "../../../_store/interfaces";
import {connect} from "react-redux";
import UserCoworkers from "./fragments/coworkers/UserCoworkers";
import {divTitle, rowTitle} from "./style";

interface IProps {
}

const User = (props: IProps) => {

    return (
        <div>
            <Grid item xl={4} md={4} sm={12} xs={12}>
                <h1 style={{
                    color: "#184386", marginBottom: 30, textAlign: "left", fontFamily: 'sfuiMedium',
                    marginTop: "40px"
                }}>Ustawienia konta</h1>
                <UserDataEditForm/>
                <hr/>
            </Grid>
            <Grid item xl={12} md={12} xs={12} style={{paddingLeft: 20, height: "auto"}}>
                <Row style={rowTitle}>
                    <div style={divTitle}>
                        Dostawcy
                    </div>
                </Row>
                <Row>
                    <UserDeliveries/>
                </Row>
            </Grid>
            <Grid item xl={12} md={12} xs={12} style={{paddingLeft: 20, height: "auto"}}>
                <Row style={rowTitle}>
                    <div style={divTitle}>
                        Personel firmy
                    </div>
                </Row>
                <Row>
                    <UserCoworkers/>
                </Row>
            </Grid>
        </div>
    )
}


const mapStateToProps = (state: ISystemState) => ({});

const mapDispatch = {};

export default connect(mapStateToProps, mapDispatch)(User);

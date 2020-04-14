import React from "react";
import {Container, Grid} from "@material-ui/core";
import {connect} from "react-redux";
import Login from "./Login";
import {userActions} from "../../../_store/actions/user.actions";
import {useParams} from 'react-router-dom'
import {ISystemState} from "../../../_store/interfaces";

const LoginContainer = (props: any) => {
    let {id} = useParams()
    if (typeof id == "string") {
        userActions.activateAccount(id);
    }

    return (
        <Container>
            <h1 style={{color: "#1B4C82", fontSize: 46, textAlign: "left"}}>OWapp</h1>
            <Grid container spacing={5}>
                <Grid item xl={3} md={3} sm={1} xs={1}/>
                <Grid item xl={6} md={6} sm={10} xs={10}>
                    <Grid item xl={12} md={12} xs={12} style={{paddingLeft: 20}}>
                        <h2 style={{
                            color: "#07358D",
                            marginBottom: 50,
                            textAlign: "left",
                            fontSize: 46
                        }}>Logowanie </h2>
                        <Login/>
                        <div style={{color: "#B4B4B4", fontSize: "13px", marginTop: "100px"}}>
                            OWApp v 1.0 Mek Group Sp. z o.o.
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}


// @ts-ignore
const mapStateToProps = (state: ISystemState) => ({});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

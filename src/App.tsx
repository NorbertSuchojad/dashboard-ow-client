import React from 'react'
import "./App.css";
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import Register from "./components/pages/register/Register";
import Home from "./components/pages/home/Home";
import { ISystemState } from "./_store/interfaces";
import { connect } from "react-redux";
import { history } from "./_store/helpers/history";
import LoginContainer from "./components/pages/login/LoginContainer";
import { userActions } from "./_store/actions/user.actions";
import Alert from "./components/pages/alert/Alert";
import GlobalFonts from '../src/fonts/fonts';
import ResetPassword from "./components/pages/password/ResetPassword";
import UpdatePassword from "./components/pages/password/UpdatePassword";

interface IProps {
    isAuthenticated: boolean | null,
    token: string,
    checkAuth(): void,
    getUserDataByToken(token: string): void
}

const App = (props: IProps) => {

    props.checkAuth();
    history.listen((location, action) => {
        // clear alert on location change
        // alertActions.clear();
        // props.clearAlert()
    });

    if (props.isAuthenticated) {
        props.getUserDataByToken(props.token);
    }


    const app = props.isAuthenticated !== null ? (
        <>
            <Alert />
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={LoginContainer} />
                    <Route path='/home' component={Home} />
                    <Route path='/login/:id' component={LoginContainer} />
                    <Route path='/login' component={LoginContainer} />
                    <Route path='/register' component={Register} />
                    <Route path='/resetPassword' component={ResetPassword} />\
                    <Route path='/updatePassword' component={UpdatePassword} />
                    <Route path='/logout' component={LoginContainer} />
                    <Redirect from="*" to="/login" />
                </Switch>
            </Router>
        </>
    ) : null;

    return (
        <div className="App">
            <GlobalFonts />
            {app}
        </div>
    );
};

const mapStateToProps = (state: ISystemState) => ({
    isAuthenticated: state.isAuthenticated,
    token: state.token.jwtToken,
});

const mapDispatchToProps = {
    checkAuth: userActions.checkAuthentication,
    getUserDataByToken: userActions.getUserDataByToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

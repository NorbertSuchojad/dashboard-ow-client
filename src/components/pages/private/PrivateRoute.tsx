import React from "react";
import {Redirect, Route, RouteProps} from "react-router-dom";


interface PrivateRouteProps extends RouteProps {
    component: any;
}


// @ts-ignore
export const PrivateRoute = ({component: Component, ...rest}) => (

    <Route {...rest} render={props => (
        localStorage.getItem('authenticated')
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>
)

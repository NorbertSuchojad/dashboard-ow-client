import React from "react";
// @ts-ignore
import SideNav, { NavIcon, NavItem, NavText } from '@trendmicro/react-sidenav';
// @ts-ignore
import Dashboard from "../dashboard/Dashboard";
import Messages from "../messages/Messages";
import { ISystemState } from "../../../_store/interfaces";
import { connect } from "react-redux";
import LoginContainer from "../login/LoginContainer";
import Register from "../register/Register";
import User from "../users/User";
import { BrowserRouter, Route } from 'react-router-dom';
import { userActions } from "../../../_store/actions/user.actions";


class Home extends React.Component<any, any> {
    private width: number;
    private isMobile: boolean;

    constructor(props: any) {
        super(props);
        this.width = window.innerWidth;
        this.isMobile = this.width <= 600;
        this.width = window.innerWidth;
        this.state = {
            expanded: false
        }
    }

    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        if (this.state.expanded !== nextState.expanded) {
            return true;
        }
        return false;
    }

    render() {
        return (

            <div className={"fluid"} style={{ background: "#DFE5EA" }}
                onClick={() => {
                    if (this.state.expanded) {
                        this.setState({ expanded: false });
                    }
                }}>

                <BrowserRouter>
                    <Route render={({ location, history }) => <React.Fragment>
                        <SideNav expanded={this.state.expanded} onSelect={(selected: string) => {
                            const to = '/' + selected;
                            if (location.pathname !== to) {
                                history.push(to);
                            }
                        }}
                            onToggle={(expanded: boolean) => {
                                if (!this.isMobile) {
                                    this.setState({ expanded: expanded });
                                }
                            }}
                            style={{ background: "#184386", position: "fixed" }}>
                            {(() => {
                                if (!this.isMobile) {
                                    return <SideNav.Toggle />
                                }
                            })()}
                            <SideNav.Nav defaultSelected="dashboard">
                                <NavItem eventKey="dashboard">
                                    <NavIcon>
                                        <i className={"fa fa-fw fa-dashboard"} style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Dashboard
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="user">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        User
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="messages">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-envelope-o" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Messages
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="logout" onClick={() => this.props.logout()}>
                                    <NavIcon>
                                        <i className="fa fa-fw fa-sign-out" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Logout
                                    </NavText>
                                </NavItem>
                            </SideNav.Nav>
                        </SideNav>
                    </React.Fragment>} />
                    <div style={{
                        position: "relative",
                        overflow: "hidden",
                        transition: "all .15s",
                        padding: "0 20px",
                        marginLeft: this.state.expanded ? "260px" : "80px",
                    }}>

                        <Route exact path='/home' component={Dashboard} />
                        <Route path='/dashboard' component={Dashboard} />
                        <Route path='/messages' component={Messages} />
                        <Route path='/user' component={User} />
                        <Route path='/login' component={LoginContainer} />
                        <Route path='/register' component={Register} />
                    </div>

                </BrowserRouter>
            </div>
        );
    }
}


// @ts-ignore
const mapStateToProps = (state: ISystemState) => ({
    isAuthenticated: state.isAuthenticated,
    token: state.token,
});

const mapDispatch = {
    logout: userActions.logout,
};

export default connect(mapStateToProps, mapDispatch)(Home);

import React from "react";
// @ts-ignore
import SideNav, {NavIcon, NavItem, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


interface PropsInterface {
    location: any
    history: any
}

interface StateInterface {
}

export default class LeftNavigation extends React.Component<PropsInterface, StateInterface> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <SideNav id={"leftNav"} onSelect={(selected: string) => {
            }} style={{background: "#018aff"}}>
                <SideNav.Toggle/>
                <SideNav.Nav defaultSelected="dashboard">
                    <NavItem eventKey="dashboard">
                        <NavIcon>
                            <i className={"fa fa-fw fa-dashboard"} style={{fontSize: '1.75em'}}/>
                        </NavIcon>
                        <NavText>
                            Dashboard
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="users">
                        <NavIcon>
                            <i className="fa fa-fw fa-user" style={{fontSize: '1.75em'}}/>
                        </NavIcon>
                        <NavText>
                            Users
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="messages">
                        <NavIcon>
                            <i className="fa fa-fw fa-envelope-o" style={{fontSize: '1.75em'}}/>
                        </NavIcon>
                        <NavText>
                            Users
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="logout">
                        <NavIcon>
                            <i className="fa fa-fw fa-sign-out" style={{fontSize: '1.75em'}}/>
                        </NavIcon>
                        <NavText>
                            Users
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        )
    }
}

import React, { CSSProperties } from "react";
import { connect } from "react-redux";
import { ISystemState, IMessage, IChatUser } from "../../../_store/interfaces";
import { Divider, MenuItem, MenuList } from "@material-ui/core";
import ChatHistory from "./containers/Chat/ChatHistory";
import SendMessage from "./containers/Chat/SendMessage";
import { messageActions } from "../../../_store/actions/message.actions";
import { IPermissionTypes, ADMIN } from "../../../_store/constants/permission.constants";
import { setInterval } from "timers";
import { Row, Col } from "reactstrap";

interface IProps {
    getUserList(email: string): void,
    getMessageHistory(from: string, to: string, fromDate: number): void,
    email: string,
    messages: IMessage[],
    permission: IPermissionTypes,
    chatUsers: IChatUser[]
}
interface IState {
    time: number
    gridSize: 2 | 6 | 8,
    toEmail: string,
}



class Messages extends React.Component<IProps, IState> {
    //@ts-ignore
    interval: NodeJS.Timeout;
    constructor(props: IProps) {
        super(props);
        this.state = {
            time: 1,
            gridSize: 8,
            toEmail: "admin@admin.com",
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        // console.log(nextProps.messages.length, this.props.messages.length);
        // if (nextProps.messages.length > this.props.messages.length) {
        //     console.log("MMMMMMshould", true);
        //     return true;
        // }
        // console.log("MMMMMMshould", false);
        return true;
    }

    componentDidMount() {
        this.props.getUserList(this.props.email);
        this.props.getMessageHistory(this.props.email, "admin@admin.com", Date.now())
        this.interval = setInterval(() => this.updateState(), 1000);

        if (this.props.permission === ADMIN) {
            this.setState({ gridSize: 6 })
        } else {
            this.setState({ toEmail: "admin@admin.com", gridSize: 8 })
        }
    }

    updateState() {
        const value = this.state.time + 1;
        if (value === 10) {
            this.resetTimer();
            this.props.getUserList(this.props.email);
            this.props.getMessageHistory(this.props.email, this.state.toEmail, Date.now())
        } else {
            this.setState({ time: value })
        }
    }

    resetTimer() {
        this.setState({ time: 1 })
    }

    // componentWillUnmount() {
    // window.clearInterval(this.interval);
    // }

    handleChange = (event: any) => {
        const { value } = event.target;
        this.setState({
            toEmail: this.props.chatUsers[value].email
        })
        this.props.getMessageHistory(this.props.email, this.props.chatUsers[value].email, Date.now())
    }

    getStyle(): CSSProperties {
        if (this.props.permission === ADMIN) {
            return {
            }
        }
        return {
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #1B4C8229", borderRadius: "10px", padding: "20px"
        }
    }

    chat() {
        if (this.props.permission === ADMIN) {
            if (this.state.toEmail != this.props.email) {
                return (
                    <Col xl="10" lg="10" md="10" style={this.getStyle()}>
                        <ChatHistory from={this.props.email} messages={this.props.messages} />
                        <Divider style={{ marginTop: '10px' }} />
                        <SendMessage from={this.props.email} to={this.state.toEmail} />
                    </Col>
                )
            }
        } else {
            return (
                <Col xl="10" lg="10" md="10" style={this.getStyle()}>
                    <ChatHistory from={this.props.email} messages={this.props.messages} />
                    <Divider style={{ marginTop: '10px' }} />
                    <SendMessage from={this.props.email} to={this.state.toEmail} />
                </Col>
            )
        }
    }

    render() {
        return (
            <div style={{ height: "100%", marginTop: "20px" }}>
                <Row style={{ width: this.props.permission === ADMIN ? '70%' : '50%' }}>

                    {
                        this.props.permission === ADMIN &&
                        (
                            <Col xl="2" lg="2" md="2">
                                <MenuList>
                                    Wybierz użytkownika:
                                    {
                                        this.props.chatUsers.length > 0 ? this.props.chatUsers.map((user, index) => {
                                            return (<MenuItem onClick={this.handleChange} key={index} value={user.email}>{user.email}</MenuItem>)
                                        }) : <div>Brak dostępnych użytkowników</div>
                                    }
                                </MenuList>

                                <Divider orientation="vertical" flexItem />
                            </Col>
                        )
                    }
                    {this.chat()}
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state: ISystemState) => ({
    userName: state.userData.firstName,
    email: state.userData.email,
    messages: state.messageHistory,
    permission: state.permission,
    chatUsers: state.chatUsers
});

const mapDispatch = {
    getMessageHistory: messageActions.getMessageHistory,
    getUserList: messageActions.getUserList,
};

export default connect(mapStateToProps, mapDispatch)(Messages);
import React from "react";
import { IMessage } from "../../../../../_store/interfaces";
import { Box, Avatar } from "@material-ui/core";
import { Row, Col } from "reactstrap";

interface IProps {
    messages: IMessage[],
    from: string
}


const ChatHistory = (props: IProps) => {

    return (
        <div style={{ width: '100%', minHeight: "500px" }}>
            {
                props.messages.map((message, index) => {
                    if (message.fromEmail === props.from) {
                        return (
                            <Box key={index} flexDirection="row-reverse" p={1} m={1} >
                                <MyMessage message={message} />
                            </Box>
                        )
                    } else {
                        return (
                            <Box key={index} flexDirection="row" p={1} m={1} >
                                <IncomingMessage message={message} />
                            </Box>
                        )
                    }
                })
            }
        </div>
    )
}

const IncomingMessage = (props: any) => {

    return (
        <Row style={{ textAlign: 'left' }}>
            <Col xl="1" lg="1" md="1" sm="1" xs="1" style={{ paddingLeft: "0px", minWidth: "40px" }}>
                <Avatar style={{ width: "40px", height: "40px", backgroundColor: "orange", fontSize: '20px' }}>OW</Avatar>
            </Col>
            <Col xl="11" lg="11" md="11" sm="11" xs="11"
                style={{
                    padding: "5px", color: '#184386', background: "rgba(255,255,255,0.1)",
                    borderRadius: "10px", boxShadow: "0px 3px 6px #00000029"
                }}>
                <div style={{ fontSize: "13px", paddingLeft: "10px", color: "#898989" }}>
                    {new Date(props.message.date).toLocaleString()}
                </div>
                <span style={{ paddingLeft: "20px", fontSize: "17px" }}>{props.message.msg}</span>
            </Col>
        </Row >
    )
}

const MyMessage = (props: any) => {

    return (
        <Row style={{ marginRight: '10px', textAlign: 'left' }}>
            <Col xl="11" lg="11" md="11" sm="11" xs="11" style={{
                padding: "5px", color: '#184386', background: "rgba(255,255,255,0.1)",
                borderRadius: "10px", boxShadow: "0px 3px 6px #00000029"
            }}>
                <div style={{ fontSize: "13px", marginLeft: 'auto', paddingLeft: "10px", color: "#898989" }}>
                    {new Date(props.message.date).toLocaleString()}
                </div>
                <span style={{ paddingLeft: "40px", fontSize: "17px" }}>{props.message.msg}</span>
            </Col>
            <Col xl="1" lg="1" md="1" sm="1" xs="1" style={{ paddingRight: "0px", minWidth: "40px" }}>
                <Avatar style={{ width: "40px", height: "40px", backgroundColor: "rgb(24, 67, 134)", fontSize: '20px' }}>JA</Avatar>
            </Col>
        </Row>
    )
}
export default ChatHistory;












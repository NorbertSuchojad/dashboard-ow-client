import React, { useState } from "react";
import { ISystemState, IMessage, initialStateConstants } from "../../../../../_store/interfaces";
import { connect } from "react-redux";
import { TextField, Fab, InputAdornment, IconButton } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { messageActions } from "../../../../../_store/actions/message.actions";
import { animateScroll } from "react-scroll";



interface IProps {
    from: string,
    to: string,
    sendMessage(message: IMessage): void,
}

const SendMessage = (props: IProps) => {
    const [message, setMessage] = useState({ fromEmail: props.from, toEmail: props.to, msg: "", date: Date.now() });

    function sendMessage(event: any) {
        event.preventDefault();
        // if (message && message.msg && message.msg.length > 0) {
        props.sendMessage(message)
        setMessage({ ...message, msg: "" })
        // }
    }

    function onChange(event: any) {
        event.preventDefault();
        setMessage({ ...message, msg: event.target.value, date: Date.now() })
    }

    function scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "ContainerElementID"
        });
    }

    scrollToBottom();

    return (
        <div style={{ marginTop: "20px" }}>
            <form onSubmit={sendMessage}>
                <TextField
                    size="small"
                    variant="outlined"
                    value={message.msg}
                    style={{ backgroundColor: '#fff', borderRadius: '10px', width: '100%' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={sendMessage}
                                >
                                    <Send />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    onChange={onChange}
                />
            </form>
        </div>
    )
}


const mapStateToProps = (state: ISystemState) => ({
});

const mapDispatch = {
    sendMessage: messageActions.sendMessage,
};

export default connect(mapStateToProps, mapDispatch)(SendMessage);
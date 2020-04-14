import React, { useState } from "react";
import { Container, Grid, TextField } from "@material-ui/core";
import { now } from "moment";
import './../../../../App.css'
import { contStyle, rowDatesFilterStyle, divDatesFilterInput, textFieldDatesFilterInput } from "./styles";
import { Row } from "reactstrap";

interface IProps {
    title: string,
}

const DatesFilter = (props: IProps) => {
    const [from, setFrom] = useState(initialState);
    const [to, setTo] = useState(initialState);


    function initialState() {
        const today = new Date(now());
        const days = String("0" + today.getDay()).slice(-2);
        const month = String("0" + today.getMonth()).slice(-2);
        const year = today.getFullYear();
        return year + "-" + month + "-" + days;
    }

    const handleFChange = (event: any) => {
        const { name, value } = event.target;
        if (value) {
            // @ts-ignore
            setFrom(value);
        }
    };
    const handleTChange = (event: any) => {
        const { value } = event.target;
        if (value) {
            // @ts-ignore
            setTo(value)
        }
    };

    const { title } = props;
    return (
        <Container style={contStyle}>
            <h6 className="titleComponent">{title}</h6>
            <Row style={rowDatesFilterStyle}>
                <div style={divDatesFilterInput}>
                    <TextField
                        style={textFieldDatesFilterInput}
                        type={"date"} name="from" variant="outlined" value={from}
                        size="small" onChange={handleFChange} />
                </div>
                <div style={divDatesFilterInput}>
                    <TextField
                        style={textFieldDatesFilterInput}
                        type={"date"} name="to" variant="outlined" value={to}
                        size="small" onChange={handleTChange} />
                </div>
            </Row>
        </Container >
    );
}

export default DatesFilter;
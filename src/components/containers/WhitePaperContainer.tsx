import React, {CSSProperties} from "react";
import {Container} from "@material-ui/core";
import "../../App.css"

const contStyle: CSSProperties = {
    borderRadius: "10px",
    textAlign: "center",
    height: "100%",
    padding: "0px",
    textTransform: "uppercase",
    overflow: "auto"
};

const contSummaryStyle: CSSProperties = {
    borderRadius: "10px",
    textAlign: "center",
    height: "100%",
    padding: "0px",
    paddingTop: "5px",
    textTransform: "uppercase",
    overflow: "auto",
    marginTop: "5px",
    marginBottom: "10px",
    boxShadow: "0px 3px 6px #00000029"
};

const contValueSalesStyle: CSSProperties = {
    textAlign: "center",
    marginBottom: "4px",
    padding: "0px",
    bottom: "0",
    left: "0",
    textTransform: "uppercase"
};

interface PropsInterface {
}

interface StateInterface {

}

export default class WhitePaperContainer extends React.Component<PropsInterface, any>  {
    constructor(props: any) {
        super(props);
    }

    render() {

        return (
            <div style={{
                padding: "4px",
                margin: "4px",
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid rgba(27,76,130,0.25)",
                height: "fit-content",
                alignContent: "center",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.16)",
                backgroundColor: "white"
            }}>
                {this.props.children}
            </div>
        );
    }
}

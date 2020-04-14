import React from "react";

interface IProps {
    contentLvl?: string | 'first' | 'second'
    height?: string,

}

const PaperContainer: React.FunctionComponent<IProps> = props => {

    const {contentLvl, height} = props;

    if (height) {
        return (
            <div style={{
                display: "flex",
                padding: "4px",
                margin: "4px",
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid rgba(27,76,130,0.25)",
                height: height,
                alignContent: "center",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.16)"
            }}>
                {props.children}
            </div>
        )
    } else {
        return (
            <div style={{
                display: "flex",
                padding: "4px",
                margin: "4px",
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid rgba(27,76,130,0.25)",
                height: contentLvl === 'first' ? 'fit-content' : "250px",
                alignContent: "center",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.16)",
            }}>
                {props.children}
            </div>
        )
    }
}

export default PaperContainer;

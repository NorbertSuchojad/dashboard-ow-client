import React from "react";
import {Container} from "@material-ui/core";
import "../../../../App.css"
import {contStyle, contSummaryStyle, contValueSalesStyle} from "./styles";
import {CustomTooltip} from "../../../containers/customTooltip";

interface PropsInterface {
    title?: string,
    value?: number,
    parentContainer: 'standard' | 'summary' | 'valueSales',
    contentPosition: 'left' | 'right',
    colorName: string | 'red' | 'blue' | 'gray',
}

interface StateInterface {

}

export default class InfoPanel extends React.Component<PropsInterface, StateInterface> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const {title, value, parentContainer} = this.props;

        let currentStyleContainer;
        switch (parentContainer) {
            case "standard":
                currentStyleContainer = contStyle;
                break;
            case "summary":
                currentStyleContainer = contSummaryStyle;
                break;
            case "valueSales":
                currentStyleContainer = contValueSalesStyle;
                break
        }

        return (
            <CustomTooltip placement={"bottom"} title={title}>
        <Container style={currentStyleContainer} className="basicContainerStyle">
                <h6 className="titleComponent" style={{marginBottom: "10px"}}>{title}</h6>
                <div className="valueComponent" style={{
                    borderRadius: `${this.props.contentPosition === 'left' ? '0px 10px 10px 10px' : '10px 0px 0px 10px'}`,
                    backgroundColor: `${this.props.colorName}`,
                    float: this.props.contentPosition,
                    // position: 'absolute',
                    // bottom: '0px'

                }}>
                    {value} zł
                </div>
            </Container>
            </CustomTooltip>
        );
    }
}

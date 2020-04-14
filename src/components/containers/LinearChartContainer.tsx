import React, {CSSProperties} from "react";
import SingleChartNode from "./chartParts/SingleChartNode";

const divTitle: CSSProperties = {
    paddingTop: "5px",
    color: "#0064ac",
    fontSize: "13px",
    textTransform: "uppercase",
    fontFamily: 'sfuiSemibold',
};

interface PropsInterface {

}

interface StateInterface {

}

export default class LinearChartContainer extends React.Component<PropsInterface, StateInterface> {
    constructor(props: PropsInterface) {
        super(props);
        this.state = {}
    }

    render() {
        const data = [
            {
                i: 1,
                param: 423,
                val: 150.0,
            },
            {
                i:2,
                param: 3245,
                val: 50.1
            },
            {
                i: 3,
                param: 31,
                val: 96.2
            },
            {
                i: 4,
                param: 561,
                val: 20
            },
            {
                i: 5,
                param: 311,
                val: 50.3
            },
            {
                i: 6,
                param: 431,
                val: 12.2
            },
            {
                i: 7,
                param: 311,
                val: 76.9
            }
        ];
        // @ts-ignore
        return (
            <div>
                <h4 style={divTitle}>Ostatnie 7 dni</h4>
                {data.map((value, index) => <SingleChartNode singleValue={value.val} item={index} param={value.param}/>)}
            </div>
        )
    }
}
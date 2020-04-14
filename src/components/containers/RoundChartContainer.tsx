import React from "react";
import {CircularProgress, lighten, withStyles} from "@material-ui/core";


interface PropsInterface {
    progresValue: number

}

interface StateInterface {
}

export default class RoundChartContainer extends React.Component<PropsInterface, StateInterface> {


    render() {
        return (
            <div>
                <div>
                    {/*<BorderCircularProgress variant="static" value={this.props.progresValue}*/}
                    {/*                        size={300}*/}
                    {/*                        thickness={10}/>*/}
                </div>
            </div>
        );
    }

}


const BorderCircularProgress = withStyles({
    root: {
        height: 30,
        width: 30,
        padding: 20,
        backgroundColor: lighten('#fff', 0.5),
        borderRadius: "250px"
    },
    bar: {
        borderRadius: 250,
        width: 20,
        backgroundColor: '#ff6c5c',
    },
    palette: {},
    breakpoints: {
        keys: ["xxs", "xs", "sm", "md", "lg", "xl"],
        values: {
            xxs: 0,
            xs: 375,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920
        }
    }
})(CircularProgress);
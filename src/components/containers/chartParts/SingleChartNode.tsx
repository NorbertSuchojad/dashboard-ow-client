import React, {CSSProperties} from "react";
import {Slider, withStyles} from "@material-ui/core";

const wrapper: CSSProperties = {
    paddingTop: "15px",
    paddingLeft: "15px",
    paddingRight: "15px",
    display: "inline-block",
};

interface PropsInterface {
    item: number,
    singleValue: number,
    param: number
}

interface StateInterface {

}

export default class SingleChartNode extends React.Component<PropsInterface, StateInterface> {

    render() {
        const {item, singleValue} = this.props;

        return (
            <div style={wrapper}>
                <div style={{
                    display: "inline-block",
                    width: "7px",
                    height: "200px",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 3px 6px rgba(0,0,0,0.29)",
                    borderRadius: "10px",
                }}>
                    <div style={{
                        width: 12,
                        height: 12,
                        backgroundColor: "#013A82",
                        borderRadius: 6,
                        marginLeft: -3,
                        marginTop: (this.props.singleValue - 7),
                    }}>
                        <span style={{
                            position: "absolute",
                            color: "#013A82",
                            fontFamily: "sfuiMedium",
                            fontSize: "0.8em",
                            marginLeft: "-10px",
                            marginTop: "10px"
                        }}>
                        {this.props.param}
                        </span>
                    </div>
                </div>
            </div>
        )
    }


    // render() {
    //     return (
    //         <IOSSlider style={{width:"8px", padding:"0px 20px"}}
    //             orientation="vertical"
    //             aria-labelledby="vertical-slider"
    //             aria-label="ios slider"
    //             min={0} max={100}
    //             value={this.props.singleValue} valueLabelDisplay="on">
    //         </IOSSlider>
    //     )
    // }


    // render() {
    //     return (
    //         <Slider orientation="vertical"
    //                 aria-labelledby="vertical-slider"
    //                 min={0} max={100} translate={"no"}
    //                 value={this.props.singleValue}/>
    //     )
    // }
}

const iOSBoxShadow =
    '0px 3px 6px #00000029';

const IOSSlider = withStyles(
    {
        vertical: {
            color: '#fff',
            height: 8,
            width: "8px",
            padding: '20px 0',
            rail: {
                height: 8,
                width: 8,
                opacity: 1,
                backgroundColor: '#fff',
                boxShadow: iOSBoxShadow,
            },
            root: {
                color: '#fff',
                height: 2,
                width: 20,
                padding: '20px 0',
            },
        },
        root: {
            color: '#fff',
            // height: 2,
            width: 20,
            padding: '20px 0',
        },
        thumb: {
            height: 16,
            width: 16,
            backgroundColor: '#013A82',
            boxShadow: iOSBoxShadow,
            marginTop: -8,
            marginLeft: 0,
            '&:focus,&:hover,&$active': {
                boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    boxShadow: iOSBoxShadow,
                },
            },
        },
        // active: {},
        valueLabel: {
            left: 'calc(-50% + 11px)',
            top: -22,
            '& *': {
                background: 'transparent',
                color: '#000',
            },
        },
        track: {
            height: "8px",
            width: "8px",
        },
        rail: {
            height: 8,
            width: 8,
            opacity: 1,
            backgroundColor: '#fff',
            boxShadow: iOSBoxShadow,
            vertical: {
                height: 8,
                width: 8,
                opacity: 1,
                backgroundColor: '#fff',
                boxShadow: iOSBoxShadow,
            }
        },
        mark: {
            backgroundColor: '#bfbfbf',
            height: "8px",
            width: 1,
            marginTop: -3,
        },
        markActive: {
            opacity: 1,
            backgroundColor: 'currentColor',
        },
    },
)(Slider);
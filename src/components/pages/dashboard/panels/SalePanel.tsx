import React from "react";
import {Container, LinearProgress, withStyles} from "@material-ui/core";
import "../../../../App.css"
import {contStyle, contSummaryStyle, contValueSalesStyle, useStyles} from "./styles";
import moment from "moment";
import {ISystemState} from "../../../../_store/interfaces";
import {connect} from "react-redux";
import {CustomTooltip} from "../../../containers/customTooltip";

interface IProps {
    title?: string,
    parentContainer: 'standard' | 'summary' | 'valueSales',
    contentPosition: 'left' | 'right',
    colorName: string | 'red' | 'blue' | 'gray',
    provision: number,
}

const SalePanel = (props: IProps) => {
    const classes = useStyles();
    const {title, parentContainer} = props;
    const meanDaysInTwoMonts = (moment(new Date().getMonth() + 1, "MM").daysInMonth()
        + moment(new Date().getMonth() + 2, "MM").daysInMonth()) * 0.5;
    const [completed, setCompleted] = React.useState(100-((daysToPay() * 100 / meanDaysInTwoMonts)));
    const [buffer, setBuffer] = React.useState(100-((daysToPay() * 100 / meanDaysInTwoMonts) + 1));
    const progress = React.useRef(() => {
    });
    function daysToPay() {
        const nowDay = new Date().getDate();//dzisiejszy dzien w miesiacu
        let daysElapsed;
        if (nowDay < 15) {
            daysElapsed = 15 - nowDay;
        } else {
            const daysInCurrentMonth = moment(new Date().getMonth() + 1, "MM").daysInMonth();
            daysElapsed = daysInCurrentMonth - nowDay + 15;
        }
        return daysElapsed;
    }

    React.useEffect(() => {
        progress.current = () => {
            if (completed > 100) {
                setCompleted(0);
                setBuffer(1);
            }
        };
    });

    React.useEffect(() => {
        function tick() {
            progress.current();
        }

        const timer = setInterval(tick, 500);
        return () => {
            clearInterval(timer);
        };
    }, []);

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

    function tooltipValue() {
        return "Tyle zostanie wypłacone za " + daysToPay() + " dni"
    }

    return (
        <CustomTooltip className={classes.tooltipCLS} placement={"top"} title={tooltipValue()}>
            <Container style={currentStyleContainer} className="basicContainerStyle">
                <h6 className="titleComponent" style={{marginBottom: "10px"}}>{title}</h6>
                {
                    daysToPay() < 15 ?
                        (<BorderLinearProgressHope
                            variant="buffer"
                            value={completed}
                            valueBuffer={buffer}/>) :
                        (<BorderLinearProgressDanger
                            variant="buffer"
                            value={completed}
                            valueBuffer={buffer}/>)
                }

                <div className="valueComponent"
                     style={{
                         borderRadius: `${props.contentPosition === 'left' ? '0px 10px 10px 10px' : '10px 0px 0px 10px'}`,
                         float: props.contentPosition,
                         color: 'black',
                         position: "inherit",
                         zIndex: 1,
                         marginBottom: "5px",
                     }}>
                    {props.provision} zł
                </div>
            </Container>
        </CustomTooltip>
    );
};

const mapStateToProps = (state: ISystemState) => ({
    provision: state.provision,
});

const mapDispatch = {};

export default connect(mapStateToProps, mapDispatch)(SalePanel);

const BorderLinearProgressDanger = withStyles({
    root: {
        height: '50%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: '50%',
        top: '50%',
    },
    bar: {
        backgroundColor: 'rgb(239, 69, 95)',
    },
    dashedColorPrimary: {
        backgroundImage: "radial-gradient(rgb(239, 69, 95) 0%, rgb(239, 69, 95) 16%, transparent 42%)",
    }
})(LinearProgress);

const BorderLinearProgressHope = withStyles({
    root: {
        height: '50%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: '50%',
        top: '50%',
    },
    bar: {
        backgroundColor: 'rgb(24, 67, 134)',
    },
    dashedColorPrimary: {
        backgroundImage: "radial-gradient(rgb(24, 67, 134) 0%, rgb(24, 67, 134) 16%, transparent 42%)",
    }
})(LinearProgress);
import React, { CSSProperties } from "react";
import { Row } from "reactstrap";
import InfoPanel from "./panels/InfoPanel";
import { Grid } from "@material-ui/core";
import PaperContainer from "./../../containers/PaperContainer";
import { connect } from "react-redux";
import DatesFilter from "./panels/DatesFilter";
import ChartSaleDelivery from '../../containers/chartParts/ChartSaleDelivery'
import "../../../App.css";
import SalePanel from "./panels/SalePanel";
import { ISystemState } from "../../../_store/interfaces";
import { useStyles } from "./panels/styles";

const rowTitle: CSSProperties = { marginTop: "40px", marginBottom: "10px" };

const red = '#EF455F';
const gray = '#6A737D';
const blue = '#1B4C82';

interface IProps {
    totalSale: number,
    totalSaleForLastHour: number,
    provision: number,
}

const Dashboard = (props: IProps) => {
    const classes = useStyles();

    return (
        <div className={"fluid"}>
            <h1 style={{
                color: "#184386",
                textAlign: "left",
                fontFamily: 'sfuiMedium',
                marginTop: "40px"
            }}>Dashboard</h1>
            <Row style={rowTitle}>
                <div className="titleContainer">
                    Wynik
                </div>
                <Grid container spacing={2} style={{ marginTop: "2px" }}>
                    <Grid item xl={2} lg={2} md={3} sm={12} xs={12}>
                        <PaperContainer contentLvl="first" height={"auto"}>
                            {/*<CustomTooltip className={classes.tooltipCLS} placement={"bottom"} title={"Łączna sprzedaż produktów objętych promocją"}>*/}
                            <InfoPanel title={"Łączna sprzedaż"} value={props.totalSale} contentPosition={"left"}
                                colorName={red} parentContainer={'standard'} />
                            {/*</CustomTooltip>*/}
                        </PaperContainer>
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={12} xs={12}>
                        <PaperContainer contentLvl="first" height={"auto    "}>
                            <SalePanel title={"Prowizja do wypłaty"} contentPosition={"left"}
                                colorName={blue} parentContainer={'standard'} />
                        </PaperContainer>
                    </Grid>
                </Grid>
            </Row>
            <Row style={rowTitle}>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <div className="titleContainer">
                        Dzisiejsza sprzedaż u dostawców
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <PaperContainer contentLvl="second">
                                <ChartSaleDelivery />
                            </PaperContainer>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xl={2} lg={3} md={3} sm={12} xs={12} className="next-container">
                    <div className="titleContainer">
                        Sprzedaż z okresu
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <PaperContainer contentLvl="second">
                                <Grid container spacing={2}>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <InfoPanel title={"Bieżący tydzień"} value={825.00} contentPosition={"left"}
                                            colorName={blue} parentContainer={'summary'} />
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <InfoPanel title={"Bieżący miesiąc"} value={1125.00} contentPosition={"left"}
                                            colorName={blue} parentContainer={'summary'} />
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <InfoPanel title={"Poprzedni miesiąc"} value={125.00} contentPosition={"left"}
                                            colorName={blue} parentContainer={'summary'} />
                                    </Grid>
                                </Grid>
                            </PaperContainer>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xl={2} lg={3} md={3} sm={12} xs={12} className="next-container">
                    <div className="titleContainer">
                        WYNIK Z ZAKRESU CZASU
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <PaperContainer contentLvl="second">
                                <Grid container spacing={2} style={{ margin: "1px", backgroundColor: "white", borderRadius: "10px" }}>
                                    <DatesFilter title={'zakres sprzedaży'} />
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ paddingLeft: "0px", display: "flex", }}>
                                        <InfoPanel title={"Wynik"} value={222.00} contentPosition={"left"}
                                            colorName={blue} parentContainer={'valueSales'} />
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ paddingLeft: "0px", display: "flex", }}>
                                        <InfoPanel title={"Prowizja"} value={222.00} contentPosition={"left"}
                                            colorName={blue} parentContainer={'valueSales'} />
                                    </Grid>
                                </Grid>
                            </PaperContainer>
                        </Grid>
                    </Grid>
                </Grid>
            </Row>
        </div>
    );
}


const mapStateToProps = (state: ISystemState) => ({
    totalSale: state.totalSale,
    totalSaleForLastHour: state.totalSale,
    provision: state.provision,
});

const mapDispatch = {};

export default connect(mapStateToProps, mapDispatch)(Dashboard);

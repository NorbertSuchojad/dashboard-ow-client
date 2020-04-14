import { CSSProperties } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core";

export const contStyle: CSSProperties = {
    borderRadius: "10px",
    textAlign: "center",
    padding: "0px",
    textTransform: "uppercase",
    overflow: "auto"
};

export const contSummaryStyle: CSSProperties = {
    borderRadius: "10px",
    textAlign: "center",
    height: "100%",
    padding: "0px",
    paddingTop: "5px",
    textTransform: "uppercase",
    overflow: "auto",
    // marginTop: "5px",
    // marginBottom: "10px",
    boxShadow: "0px 3px 6px #00000029"
};

export const contValueSalesStyle: CSSProperties = {
    textAlign: "center",
    marginBottom: "4px",
    padding: "0px",
    bottom: "0",
    left: "0",
    textTransform: "uppercase"
};

export const rowDatesFilterStyle: CSSProperties = { margin: "0", marginBottom: "10px" };
export const divDatesFilterInput: CSSProperties = { padding: "0", width: "50%" };
export const textFieldDatesFilterInput: CSSProperties = { padding: "0", width: "90%" };


export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tooltipCLS: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 11,
            arrow: {
                color: theme.palette.common.white,
            },
            tooltip: {
                backgroundColor: '#1B4C82',
                color: '#1B4C82',
            },
        }
    })
)
    ;
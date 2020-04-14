import {CSSProperties} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {deepOrange, deepPurple} from "@material-ui/core/colors";

export const divTitle: CSSProperties = {
    color: "#fff",
    borderRadius: "0px 10px 10px 0px",
    backgroundColor: "#1B4C82",
    fontSize: "13px",
    padding: "5px",
    margin: "5px",
    textTransform: "uppercase",
    float: "left",
    marginBottom: "10px",
    marginTop: "20px",
    fontFamily: 'sfuiSemibold'
};
export const rowTitle: CSSProperties = {};

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
        },
        purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple[500],
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            borderRadius: "10px",
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #1B4C82',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 2),
        },
        editModal: {
            margin: theme.spacing(1),
            backgroundColor: "#1B4C82",
            color: "#FFF",
        },
        divTitle: {
            color: "#fff",
            borderRadius: "0px 10px 10px 0px",
            backgroundColor: "#1B4C82",
            fontSize: "13px",
            padding: "5px",
            textTransform: "uppercase",
            float: "left",
            marginBottom: "20px",
            marginTop: "5px",
            fontFamily: 'sfuiSemibold'
        },
        profileData: {
            textAlign: "left",
            color: "green"
        },
        profileFirstLastName: {
            color: "#1B4C82",
            fontFamily: "sfuiMedium"
        },
        profileLabel: {
            color: "#6A737D",
            fontFamily: "sfuiMedium",
            fontSize: "13px",
            margin: 0,
            padding: 0
        },
        profileParagraph: {
            color: "#1B4C82",
            fontFamily: "sfuiMedium",
            fontSize: "13px",
            margin: 0,
            padding: 0
        },
        formInput: {
            backgroundColor: "rgba(255,255,255,0.5)",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.16)",
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);
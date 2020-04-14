import React from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Tooltip, TooltipProps} from "@material-ui/core";

const useStylesCustom = makeStyles((theme: Theme) => ({
    arrow: {
        color: "#1B4C82",
    },
    tooltip: {
        backgroundColor: "#1B4C82",
        color: "white",
    },
}));

export function CustomTooltip(props: TooltipProps) {
    const classes = useStylesCustom();

    return <Tooltip arrow
                    aria-label="tooltip"
                    color={"primary"}
                    interactive
                    classes={classes}
                    {...props} />;
}
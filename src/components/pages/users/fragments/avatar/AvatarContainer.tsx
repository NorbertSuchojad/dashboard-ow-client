import React from "react";
import {Avatar} from "@material-ui/core";


interface IProps {
    firstElement: any,
    secondElement: any
}
const AvatarContainer = (props: IProps) => {

    const { firstElement, secondElement } = props

    if (firstElement && secondElement) {
        return (
            <Avatar alt=''
                style={{
                    width: 60,
                    height: 60,
                    margin: '10px 10px 10px 20px',
                    boxShadow: "0px 3px 6px rgba(0,0,0,0.25)"
                }}>
                {firstElement.substr(0, 1).toUpperCase() + secondElement.substr(0, 1).toUpperCase()}
            </Avatar>
        )
    }
    else {
        return (
        <Avatar alt=''
            style={{
                width: 60,
                height: 60,
                margin: '10px 10px 10px 20px',
                boxShadow: "0px 3px 6px rgba(0,0,0,0.25)"
            }}>
            AA
        </Avatar>
        )
    }
}
export default AvatarContainer;
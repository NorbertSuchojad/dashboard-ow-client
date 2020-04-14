import PaperContainer from "../../../../containers/PaperContainer";
import { Backdrop, Fade, FormGroup, FormHelperText, Grid, InputLabel, MenuItem, Modal, Select, TextField } from "@material-ui/core";
import InfoPanel from "../../../dashboard/panels/InfoPanel";
import WhitePaperContainer from "../../../../containers/WhitePaperContainer";
import Row from "reactstrap/lib/Row";
import Fab from "@material-ui/core/Fab";
import React, { useState } from "react";
import { ICompany, initialStateConstants, IPosUser, ISystemState, IUser } from "../../../../../_store/interfaces";
import { connect } from "react-redux";
import { userActions } from "../../../../../_store/actions/user.actions";
import { Delete, Edit, TrendingUp } from "@material-ui/icons";
import AvatarContainer from './../avatar/AvatarContainer';
import { ADMIN, IPermissionTypes, MANAGER } from "../../../../../_store/constants/permission.constants";
import { useStyles } from "../../style"

interface IProps {
    coworker: IUser,
    currentCompany: ICompany,
    posUsers: IPosUser[],
    permission: IPermissionTypes,

    getPosUsers(company: ICompany): void,

    updateCoworker(coworker: IUser): void,

    unpinCoworker(coworker: IUser, company: ICompany): void,
}

const SingleCoworker = (props: IProps) => {
    const contentAllowed = props.permission === ADMIN || props.permission === MANAGER;

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [selectedPosUser, setSelectedPosUser] = useState(initialStateConstants.posUserInit);
    const [coworker, setCoworker] = useState(initialStateConstants.userInit);

    function handleChange(event: any) {
        const { name, value } = event.target;
        setCoworker({
            ...coworker,
            [name]: value
        })
    }

    function handleSelectChange(event: any) {
        const { value } = event.target;
        setSelectedPosUser({
            username: value,
        })
    }

    function handleClose() {
        setOpen(false);
    }

    function handleSubmit(event: any) {
        event.preventDefault();

        setSubmitted(true);
        if (coworker) {
            props.updateCoworker(coworker);
        }
    }

    function handleDelete(event: any) {
        event.preventDefault();
        setSubmitted(true);
        if (props.coworker) {
            props.unpinCoworker(props.coworker, props.currentCompany);
        }
    }

    function handleOpen(event: any) {
        event.preventDefault();
        props.getPosUsers(props.currentCompany);
        setCoworker(props.coworker);
        setOpen(true);
    }

    const cw = props.coworker;
    const cp = props.currentCompany;
    const posUsers = props.posUsers

    return (
        <Grid item lg={3} xl={3} md={6} sm={12}>
            <PaperContainer contentLvl={"first"}>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div style={{ padding: "4px" }}>
                            <InfoPanel parentContainer={"summary"} contentPosition={"left"} colorName={"#1A4884"} value={cw.totalSale}
                                title={"Dzisiejsza sprzedaż"} />
                        </div>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <WhitePaperContainer>
                            <Row style={{ alignItems: "center" }}>
                                <AvatarContainer firstElement={cw.firstName} secondElement={cw.lastName} />
                                <div style={{ marginLeft: "20px", textAlign: "left" }}>
                                    <div style={{ fontSize: "17px", color: "#003C88" }}>{cw.firstName} {cw.lastName}</div>
                                    <div style={{ fontSize: "13px", color: "#69737E" }}>{cp.name}</div>
                                    <div style={{ fontSize: "13px", color: "#1B4C82", textTransform: "capitalize" }}>{cw.role.name}</div>
                                </div>
                            </Row>
                            {
                                contentAllowed &&
                                <hr style={{
                                    border: "none",
                                    height: "2px", background: "#FFFFFF 0% 0% no-repeat padding-box",
                                    boxShadow: "0px 3px 6px #00000029", margin: "10px 20px",
                                    borderRadius: "10px"
                                }} />
                            }
                            {
                                contentAllowed &&
                                <Row>
                                    <div style={{ marginLeft: "auto", marginRight: "10px" }}>
                                        <Fab color="primary" size="small" aria-label="edit" className={classes.editModal}
                                            onClick={handleDelete}>
                                            <Delete />
                                        </Fab>
                                        <Fab color="primary" size="small" aria-label="edit" className={classes.editModal}
                                            onClick={handleOpen}>
                                            <Edit />
                                        </Fab>
                                        <Fab color="primary" size="small" aria-label="edit" className={classes.editModal}>
                                            <TrendingUp />
                                        </Fab>
                                    </div>
                                </Row>
                            }
                        </WhitePaperContainer>
                    </Grid>
                </Grid>
            </PaperContainer>

            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form name="form" onSubmit={handleSubmit}>
                            <Row style={{
                                margin: 0, padding: 0
                            }}>
                                <div className={classes.divTitle}>
                                    Edycja danych
                                </div>
                            </Row>

                            <FormGroup
                                className={'form-group' + (submitted && !cw.firstName ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined"
                                    disabled
                                    className={classes.formInput} type="text" name="firstName" value={cw.firstName} label={"firstName"}
                                    onChange={handleChange} />
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !cw.lastName ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined"
                                    disabled
                                    className={classes.formInput} type="text" name="lastName" value={cw.lastName} label={"lastName"}
                                    onChange={handleChange} />
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !cw.email ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined"
                                    disabled
                                    className={classes.formInput} type="text" name="email" value={cw.email} label={"email"}
                                    onChange={handleChange} />
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !cw.role ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined"
                                    className={classes.formInput} type="text" name="role" value={cw.role.name} label={"role"}
                                    onChange={handleChange} />
                                {submitted && !cw.role &&
                                    <FormHelperText error={true}>nip jest wymagany</FormHelperText>
                                }
                            </FormGroup>
                            <FormGroup
                                className={'form-group'}>
                                <InputLabel id="demo-simple-select-label">POS USER</InputLabel>
                                <Select className={classes.formInput}
                                    variant="outlined"
                                    value={selectedPosUser.username}
                                    onChange={handleSelectChange}>
                                    <MenuItem className={classes.selectEmpty} key={"noPosUser"} value=""><em>None</em></MenuItem>
                                    {posUsers.map(user => {
                                        return (
                                            <MenuItem style={{ height: '25px' }} key={user.username} value={user.username}>{user.username}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormGroup>

                            <div className="form-group">
                                <div style={{ height: 30 }}>
                                    <button className="btn btn-primary pull-right" style={{
                                        width: "fit-content",
                                        backgroundColor: "#184386", border: "0px",
                                        borderRadius: "10px",
                                        boxShadow: "0px 3px 6px #00000029"
                                    }} onClick={handleSubmit}>Zapisz
                                    </button>

                                    <div className="btn btn-primary pull-left" style={{
                                        width: "fit-content",
                                        backgroundColor: "#184386", border: "0px",
                                        borderRadius: "10px",
                                        boxShadow: "0px 3px 6px #00000029"
                                    }} onClick={handleClose}>Anuluj
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </Grid>
    )
};


const mapStateToProps = (state: ISystemState) => ({
    currentCompany: state.currentCompanySelected,
    posUsers: state.posUsers,
    permission: state.permission,
});

const mapDispatch = {
    updateCoworker: userActions.updateCoworker,
    unpinCoworker: userActions.unpinCoworker,
    getPosUsers: userActions.getPosUsers,
};

export default connect(mapStateToProps, mapDispatch)(SingleCoworker);
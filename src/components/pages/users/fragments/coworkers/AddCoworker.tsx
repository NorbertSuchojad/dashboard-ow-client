import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {Fade, FormGroup, FormHelperText, Grid, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {ICompany, initialStateConstants, ISystemState, IUser, IUserData} from "../../../../../_store/interfaces";
import {connect} from "react-redux";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Row from "reactstrap/lib/Row";
import {userActions} from "../../../../../_store/actions/user.actions";
import {useStyles} from "../../style"


interface IProps {
    userData: IUserData,
    company: ICompany,
    addCoworker(user: IUser, company: ICompany, userData:IUserData): void,
    onChange(e:any):void,
}

const AddCoworker = (props: IProps) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [user, setUser] = useState(initialStateConstants.userInit);

    function handleChange(event: any) {
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    function handleClose() {
        setOpen(false);
    }

    function handleSubmit(event: any) {
        event.preventDefault();

        setSubmitted(true);
        if (user.email && user.role) {            
            props.addCoworker(user, props.company, props.userData);
        }
        setOpen(false);
        props.onChange(event);
    }

    return (
        <Grid item lg={1} xl={1} md={2} sm={2}>
            <Fab color="primary" size="small" aria-label="edit" variant={"extended"} className={classes.editModal} onClick={() => setOpen(true)}>
                <AddIcon fontSize="large"/> Dodaj
            </Fab>
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
                                className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                <TextField variant="outlined"
                                           className={classes.formInput}
                                           type="text" name="email" value={user.email} label={"EMAIL"}
                                           onChange={handleChange}/>
                                {submitted && !user.email &&
                                <FormHelperText error={true}>Email jest wymagany</FormHelperText>
                                }
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !user.role.name ? ' has-error' : '')}>
                                <TextField variant="outlined"
                                           disabled
                                           className={classes.formInput}
                                           type="text" name="role" label={"ROLE"}
                                           value={user.role.name} onChange={handleChange}/>
                                {submitted && !user.role.name &&
                                <FormHelperText error={true}>Nazwa jest wymagana</FormHelperText>
                                }
                            </FormGroup>
                            <div className="form-group">
                                <div style={{height: 30}}>
                                    <button className="btn btn-primary pull-right" style={{
                                        width: "fit-content",
                                        backgroundColor: "#184386", border: "0px",
                                        borderRadius: "10px",
                                        boxShadow: "0px 3px 6px #00000029"
                                    }} onClick={handleSubmit}>Wyślij
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
    userData: state.userData,
});

const mapDispatch = {
    addCoworker: userActions.addNewCoworker,
};

export default connect(mapStateToProps, mapDispatch)(AddCoworker);
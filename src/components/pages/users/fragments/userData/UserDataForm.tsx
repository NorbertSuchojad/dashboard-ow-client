import {Avatar, CircularProgress, Fab, Fade, FormGroup, FormHelperText, TextField} from "@material-ui/core";
import React, {useState} from "react";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
// @ts-ignore
import Row from "reactstrap/lib/Row"; // web.cjs is required for IE 11 support
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import {ICompany, initialStateConstants, ISystemState, IUserData} from "../../../../../_store/interfaces";
import {connect} from "react-redux";
import {companyActions} from "../../../../../_store/actions/company.actions";
import {userActions} from "../../../../../_store/actions/user.actions";
import {divTitle, editModal, formInput, modal, paper, profileData, profileFirstLastName, profileLabel, profileParagraph} from "./styles";
import {ADMIN, IPermissionTypes, MANAGER, WAITER} from "../../../../../_store/constants/permission.constants";


interface IPropsUserDataEditForm {
    userData: IUserData,
    currentCompany: ICompany,
    permission: IPermissionTypes,

    updateUserData(user: IUserData): void,

    updateCompanySelection(company: ICompany): void
}

const UserDataEditForm = (props: IPropsUserDataEditForm) => {

    const contentAllowed = props.permission === ADMIN || props.permission === MANAGER;
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [checked, setChecked] = useState(false);
    const [user, setUser] = useState(initialStateConstants.userDataInit);

    const handleOpen = () => {
        setOpen(true)
        setUser(props.userData)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleChange = (event: any) => {
        const {name, value, checked} = event.target;

        setUser({
                ...user,
                [name]: value,
            }
        )
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setSubmitted(true);
        if (user) {
            props.updateUserData(user);
        }
    };

    if (props.currentCompany && props.userData) {
        const companySelected = props.currentCompany;
        const {firstName, lastName, email, role, companies} = props.userData;
        return (
            <Row style={{position: "relative"}}>
                <Avatar alt=''
                        style={{
                            width: 120,
                            height: 120,
                            boxShadow: "0px 3px 6px rgba(0,0,0,0.25)",
                            marginLeft: "10px"
                        }}>{firstName.substr(0, 1).toUpperCase() + lastName.substr(0, 1).toUpperCase()}</Avatar>
                <div style={{marginLeft: "20px", textAlign: "left"}}>
                    <h4 style={profileFirstLastName}>{firstName + " " + lastName}</h4>
                    <div style={profileData}>
                        <label style={profileLabel}>STANOWISKO</label>
                        <p style={profileParagraph}>{role} w firmie {companySelected.name}</p>
                        <label style={profileLabel}>KONTAKT</label>
                        <p style={profileParagraph}>{email} / +500400300</p>
                        <select
                            className="form-control form-control-sm"
                            style={profileLabel}
                            defaultValue={companySelected.name}
                            onChange={event => {
                                event.preventDefault();
                                const {name, accessKey, value} = event.target;
                                const sel = companies.filter(value1 => {
                                    return value1.nip === value
                                })
                                props.updateCompanySelection(sel[0]);
                            }}>
                            {companies.map((cm: ICompany, id: number) => {
                                    return (
                                        <option key={cm.nip} value={cm.nip} >{cm.name}</option>
                                    )
                                }
                            )}
                        </select>

                    </div>
                </div>
                <Fab color="primary" size="small" aria-label="edit" style={editModal}>
                    <EditIcon onClick={handleOpen}/>
                 </Fab>
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    style={modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div style={paper}>
                            <form name="form" onSubmit={handleSubmit}>
                                <Row style={{
                                    margin: 0, padding: 0
                                }}>
                                    <div style={divTitle}>
                                        Edycja danych
                                    </div>
                                </Row>
                                <FormGroup
                                    className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                    <TextField variant="outlined"
                                               style={formInput}
                                               type="email" name="email"
                                               value={user.email}
                                               label={"EMAIL"}
                                               onChange={handleChange}
                                    />
                                    {submitted && !user.email &&
                                    <FormHelperText error={true}>Email jest wymagany</FormHelperText>
                                    }
                                </FormGroup>
                                {/*<FormGroup*/}
                                {/*    className={'form-group' + (this.state.submitted && !this.state.userData.password ? ' has-error' : '')}>*/}
                                {/*    <TextField variant="outlined"*/}
                                {/*               style={formInput}*/}
                                {/*               type="password" name="password" label={"HASŁO"}*/}
                                {/*               value={this.state.userData.password} onChange={this.handleChange}/>*/}
                                {/*    {this.state.submitted && !this.state.userData.password &&*/}
                                {/*    <FormHelperText error={true}>Hasło jest wymagane</FormHelperText>*/}
                                {/*    }*/}
                                {/*</FormGroup>*/}
                                <FormGroup
                                    className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                    <TextField variant="outlined"
                                               style={formInput}
                                               type="text" name="firstName" value={user.firstName} label={"IMIĘ"}
                                               onChange={handleChange}/>
                                    {submitted && !user.firstName &&
                                    <FormHelperText error={true}>Imię jest wymagane</FormHelperText>
                                    }
                                </FormGroup>
                                <FormGroup
                                    className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                    <TextField variant="outlined"
                                               style={formInput}
                                               type="text" name="lastName" value={user.lastName} label={"NAZWISKO"}
                                               onChange={handleChange}/>
                                    {submitted && !user.lastName &&
                                    <FormHelperText error={true}>Nazwisko jest wymagane</FormHelperText>
                                    }
                                </FormGroup>
                                <FormGroup
                                    className={'form-group' + (submitted && !companySelected ? ' has-error' : '')}>
                                    <TextField variant="outlined"
                                               disabled
                                               style={formInput}
                                               type="text" name="company" value={companySelected.name} label={"FIRMA"}
                                               onChange={handleChange}/>
                                    {submitted && !companySelected &&
                                    <FormHelperText error={true}>Firma jest wymagana</FormHelperText>
                                    }
                                </FormGroup>
                                <FormGroup
                                    className={'form-group' + (submitted && !user.role ? ' has-error' : '')}>
                                    <FormControl variant="outlined" disabled={!contentAllowed}>
                                        <InputLabel htmlFor="demo-customized-select-native">STANOWISKO</InputLabel>
                                        <Select
                                            native
                                            onChange={handleChange}
                                            style={formInput}
                                            label={"STANOWISKO"}
                                            inputProps={{
                                                name: 'position',
                                                id: 'outlined-position-native-simple',
                                            }}>
                                            {
                                                [WAITER, MANAGER].map((item,id) => {
                                                    return (
                                                        <option key={id} value={item} selected={item===user.role}>{item}</option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup
                                    className={'form-group' + (submitted && !user.role ? ' has-error' : '')}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={() => setChecked(!checked)}
                                                name="checkedRodo"
                                                color="primary"
                                            />
                                        }
                                        style={{color: "black", fontFamily: "sfuiMedium", fontSize: "10px"}}
                                        label="Oświadczam, że znam i akceptuję postanowienia Regulaminu OW."
                                    />
                                </FormGroup>
                                <div className="form-group">
                                    <div style={{height: 30}}>
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
            </Row>
        );
    } else {
        return (<div>
            <CircularProgress/>
        </div>)
    }
}

const mapStateToProps = (state: ISystemState) => ({
    currentCompany: state.currentCompanySelected,
    userData: state.userData,
    permission: state.permission,
});

const mapDispatch = {
    updateCompanySelection: companyActions.selectedCompanyChange,
    updateUserData: userActions.updateUserData,
};

export default connect(mapStateToProps, mapDispatch)(UserDataEditForm);


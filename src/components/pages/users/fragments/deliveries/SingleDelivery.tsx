import PaperContainer from "../../../../containers/PaperContainer";
import {Fade, FormGroup, FormHelperText, Grid, TextField} from "@material-ui/core";
import InfoPanel from "../../../dashboard/panels/InfoPanel";
import WhitePaperContainer from "../../../../containers/WhitePaperContainer";
import Row from "reactstrap/lib/Row";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import React, {useState} from "react";
import {ICompany, IDelivery, ISystemState} from "../../../../../_store/interfaces";
import {deliveryActions} from "../../../../../_store/actions/delivery.actions";
import {connect} from "react-redux";
import AvatarContainer from "../avatar/AvatarContainer";
import {ADMIN, IPermissionTypes, MANAGER} from "../../../../../_store/constants/permission.constants";
import {useStyles} from "../../style"

interface IProps {
    delivery: IDelivery
    currentCompany: ICompany,
    permission: IPermissionTypes,

    updateDelivery(delivery: IDelivery): void,

    deleteDelivery(delivery: IDelivery, company: ICompany): void,
}

const SingleDelivery = (props: IProps) => {
    const contentAllowed = props.permission === ADMIN || props.permission === MANAGER;


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [address, setAddress] = useState({
        city: "",
        street: "",
        postalCode: "",
    });
    const [delivery, setDelivery] = useState({
        category: "",
        name: "",
        nip: "",
        address: {
            city: "",
            street: "",
            postalCode: "",
        },
    });

    function handleChange(event: any) {
        const {name, value} = event.target;
        setDelivery({
            ...delivery,
            [name]: value
        })
    }

    function handleAddressChange(event: any) {
        const {name, value} = event.target;
        setAddress({
            ...address,
            [name]: value
        })
        setDelivery({
            ...delivery,
            address: address
        })
    }

    function handleOpen(event: any) {
        setDelivery({
            ...props.delivery,
            address: address
        })
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        setSubmitted(true);
        if (delivery && address) {
            props.updateDelivery(delivery);
        }
    }

    function handleDelete(event: any) {
        event.preventDefault();
        setSubmitted(true);
        if (props.delivery.nip) {
            props.deleteDelivery(props.delivery, props.currentCompany);
        }
    }

    const dy = props.delivery;
    const ad = dy.address ? dy.address : address;
    return (
        <Grid item lg={3} xl={3} md={6} sm={12}>
            <PaperContainer contentLvl={"first"}>
                <Grid container>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div style={{padding: "4px"}}>
                            <InfoPanel parentContainer={"summary"} contentPosition={"right"} colorName={"#6A737D"} value={825.00}
                                       title={"Prowizja do wypłaty"}/>
                        </div>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <WhitePaperContainer>
                            <Row style={{alignItems: "center"}}>
                                <AvatarContainer firstElement={dy.name.split(' ')[0]} secondElement={dy.name.split(' ')[1]}/>
                                <div style={{marginLeft: "20px", textAlign: "left"}}>
                                    <div style={{fontSize: "17px", color: "#003C88"}}>{dy.category}</div>
                                    <div style={{fontSize: "13px", color: "#69737E"}}>{dy.name}</div>
                                    <div style={{fontSize: "13px", color: "#1B4C82"}}>Kod dostawcy: {dy.nip}</div>
                                </div>
                            </Row>

                            {
                                contentAllowed &&
                                <hr style={{
                                    border: "none",
                                    height: "2px", background: "#FFFFFF 0% 0% no-repeat padding-box",
                                    boxShadow: "0px 3px 6px #00000029", margin: "10px 20px",
                                    borderRadius: "10px"
                                }}/>
                            }
                            {
                                contentAllowed &&
                                <Row>
                                    <div style={{marginLeft: "auto", marginRight: "10px"}}>
                                        <Fab color="primary" size="small" aria-label="edit" className={classes.editModal}>
                                            <DeleteIcon onClick={handleDelete}/>
                                        </Fab>
                                        <Fab color="primary" size="small" aria-label="edit" className={classes.editModal}>
                                            <EditIcon onClick={handleOpen}/>
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
                                className={'form-group' + (submitted && !dy.name ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined" className={classes.formInput} type="text" name="name" value={dy.name} label={"nazwa"}
                                           onChange={handleChange}/>
                                {submitted && !dy.name &&
                                <FormHelperText error={true}>Nazwa jest wymagana</FormHelperText>
                                }
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !dy.nip ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined" className={classes.formInput} type="text" name="nip" value={dy.nip} label={"nip"}
                                           onChange={handleChange}/>
                                {submitted && !dy.nip &&
                                <FormHelperText error={true}>nip jest wymagany</FormHelperText>
                                }
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !ad.street ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined" className={classes.formInput} type="text" name="street" value={ad.street} label={"street"}
                                           onChange={handleAddressChange}/>
                                {submitted && !ad.street &&
                                <FormHelperText error={true}>nip jest wymagany</FormHelperText>
                                }
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !ad.postalCode ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined" className={classes.formInput} type="text" name="postalCode" value={ad.postalCode}
                                           label={"postalCode"}
                                           onChange={handleAddressChange}/>
                                {submitted && !ad.postalCode &&
                                <FormHelperText error={true}>nip jest wymagany</FormHelperText>
                                }
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !ad.city ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined" className={classes.formInput} type="text" name="city" value={ad.city} label={"city"}
                                           onChange={handleAddressChange}/>
                                {submitted && !ad.city &&
                                <FormHelperText error={true}>nip jest wymagany</FormHelperText>
                                }
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
        </Grid>
    )
};


const mapStateToProps = (state: ISystemState) => ({
    currentCompany: state.currentCompanySelected,
    permission: state.permission,
});

const mapDispatch = {
    updateDelivery: deliveryActions.updateDeliveryData,
    deleteDelivery: deliveryActions.deleteDeliveryData
};

export default connect(mapStateToProps, mapDispatch)(SingleDelivery);
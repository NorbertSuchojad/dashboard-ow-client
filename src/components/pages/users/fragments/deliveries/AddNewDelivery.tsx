import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {Fade, FormGroup, FormHelperText, Grid, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {ICompany, IDelivery, ISystemState} from "../../../../../_store/interfaces";
import {connect} from "react-redux";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Row from "reactstrap/lib/Row";
import {deliveryActions} from "../../../../../_store/actions/delivery.actions";
import {useStyles} from "../../style"


interface IProps {
    company: ICompany,
    addNewDelivery(delivery: IDelivery, company: ICompany): void,
}

const AddNewDelivery = (props: IProps) => {
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

    function handleClose() {
        setOpen(false);
    }

    function handleSubmit(event: any) {
        event.preventDefault();

        setSubmitted(true);
        if (delivery.name && delivery.nip && address) {
            setDelivery({
                ...delivery,
                address: address
            });
            props.addNewDelivery(delivery, props.company);
        }
        setOpen(false);
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
                                className={'form-group' + (submitted && !delivery.name ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined" className={classes.formInput} type="text" name="name" value={delivery.name} label={"nazwa"}
                                           onChange={handleChange}/>
                                {submitted && !delivery.name &&
                                <FormHelperText error={true}>Nazwa jest wymagana</FormHelperText>
                                }
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !delivery.nip ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined" className={classes.formInput} type="text" name="nip" value={delivery.nip} label={"nip"}
                                           onChange={handleChange}/>
                                {submitted && !delivery.name &&
                                <FormHelperText error={true}>nip jest wymagany</FormHelperText>
                                }
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !address.street ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined" className={classes.formInput} type="text" name="street" value={address.street} label={"street"}
                                           onChange={handleAddressChange}/>
                                {submitted && !delivery.address.street &&
                                <FormHelperText error={true}>nip jest wymagany</FormHelperText>
                                }
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !address.postalCode ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined" className={classes.formInput} type="text" name="postalCode" value={address.postalCode}
                                           label={"postalCode"}
                                           onChange={handleAddressChange}/>
                                {submitted && !address.postalCode &&
                                <FormHelperText error={true}>nip jest wymagany</FormHelperText>
                                }
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !address.city ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined" className={classes.formInput} type="text" name="city" value={address.city} label={"city"}
                                           onChange={handleAddressChange}/>
                                {submitted && !address.city &&
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


const mapStateToProps = (state: ISystemState) => ({});

const mapDispatch = {
    addNewDelivery: deliveryActions.addNewDelivery
};

export default connect(mapStateToProps, mapDispatch)(AddNewDelivery);
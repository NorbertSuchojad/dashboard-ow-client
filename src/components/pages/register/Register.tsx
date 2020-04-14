import React, {CSSProperties, useState} from "react";

import {Container, FormGroup, FormHelperText, Grid, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {userActions} from "../../../_store/actions/user.actions";

interface PropsInterface {
    register(user: any): void,

    registering: boolean | false
}


interface StateInterface {
    user: {
        firstName: string | '',
        lastName: string | '',
        email: string | '',
        password: string | ''
    },
    submitted: boolean | false
}


const formInput: CSSProperties = {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: "10px",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.16)"
}

interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    company: string,
    password: string,
    passwordConfirm: string
}

const Register = (props: any) => {
    const [submitted, setSubmitted] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        company: '',
        password: '',
        passwordConfirm: ''
    });


    function handleChange(event: any) {
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    function validatePassword(user: IUser) {
        setPasswordValid(user.password !== user.passwordConfirm);
        return user.password !== user.passwordConfirm
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        if (!validatePassword(user)) {
            if (user.firstName && user.lastName && user.email && user.password) {
                props.register(user);

            }
        }
    }

    return (
        <Container className="fluid">
            <h1 style={{color: "#184386", fontSize: 46, textAlign: "left"}}>OWapp</h1>
            <Grid container spacing={5}>
                <Grid item xl={3} md={3} sm={1} xs={1}/>
                <Grid item xl={6} md={6} sm={10} xs={10}>
                    <Grid item xl={12} md={12} xs={12} style={{paddingLeft: 20}}>
                        <h2 style={{
                            color: "#184386",
                            marginBottom: 50,
                            textAlign: "left",
                            fontSize: 46
                        }}>Rejestracja</h2>
                        <form name="form" onSubmit={handleSubmit}>
                            <FormGroup
                                className={'form-group' + (submitted && !user.firstName ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined" style={formInput} type="text" name="firstName" value={user.firstName} label={"IMIĘ"}
                                           onChange={handleChange}/>
                                {submitted && !user.firstName &&
                                <FormHelperText error={true}>Imię jest wymagane</FormHelperText>
                                }
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !user.lastName ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined"
                                           style={formInput}
                                           type="text" name="lastName" value={user.lastName} label={"NAZWISKO"}
                                           onChange={handleChange}/>
                                {submitted && !user.lastName &&
                                <FormHelperText error={true}>Nazwisko jest wymagane</FormHelperText>
                                }
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !user.email ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined"
                                           style={formInput}
                                           type="email" name="email" value={user.email} label={"EMAIL"}
                                           onChange={handleChange}/>
                                {submitted && !user.email &&
                                <FormHelperText error={true}>Email jest wymagany</FormHelperText>
                                }
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !user.password ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined"
                                           style={formInput}
                                           type="password" name="password" label={"HASŁO"}
                                           onChange={handleChange} /*onInput={() => validatePassword(user)}*/ error={passwordValid}/>
                                {submitted && !user.password &&
                                <FormHelperText error={true}>Hasło jest wymagane</FormHelperText>
                                }
                                {passwordValid &&
                                <FormHelperText error={true}>Hasła się różnią</FormHelperText>
                                }
                            </FormGroup>
                            <FormGroup
                                className={'form-group' + (submitted && !user.password ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined"
                                           style={formInput}
                                           type="password" name="passwordConfirm" label={"POWTÓRZ HASŁO"}
                                           onChange={handleChange} /*onInput={() => validatePassword(user)}*/ error={passwordValid}/>
                                {submitted && !user.password &&
                                <FormHelperText error={true}>Hasło jest wymagane</FormHelperText>
                                }
                                {passwordValid &&
                                <FormHelperText error={true}>Hasła się różnią</FormHelperText>
                                }
                            </FormGroup>
                            <div className="form-group">
                                <button className="btn btn-primary pull-right" style={{
                                    width: 150,
                                    backgroundColor: "#184386", border: "0px",
                                    borderRadius: "10px",
                                    boxShadow: "0px 3px 6px #00000029"
                                }}>Zarejestruj
                                </button>
                                <Link to="/login">
                                    <button className="btn btn-primary pull-left" style={{
                                        width: 150,
                                        backgroundColor: "#184386", border: "0px",
                                        borderRadius: "10px",
                                        boxShadow: "0px 3px 6px #00000029"
                                    }}>Anuluj
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
    // }

}

const mapStateToProps = (state = {}) => ({});

const actionCreators = {
    register: userActions.register
};

export default connect(mapStateToProps, actionCreators)(Register)
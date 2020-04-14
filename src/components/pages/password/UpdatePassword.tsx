import React, {CSSProperties, useEffect, useState} from "react";
import {Container, FormGroup, FormHelperText, Grid, TextField} from "@material-ui/core";
import {Link, useLocation, useParams} from 'react-router-dom';
import {connect} from "react-redux";
import {IToken} from "../../../_store/interfaces";
import {userActions} from "../../../_store/actions/user.actions";


const formInput: CSSProperties = {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: "10px",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.16)"
};

interface IUser {
    password: string,
    passwordConfirm: string
}

const UpdatePassword = (props: any) => {
    const params = new URLSearchParams(props.location.search);
    const userId = params.get("id");
    const token = params.get("token");

    useEffect(() => {
        props.updatePassword(userId, token)
    }, []);

    const [passwordValid, setPasswordValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [user, setUser] = useState({
        password: '',
        passwordConfirm: '',
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        setSubmitted(true);
        if (!validatePassword(user)) {
            if (user.password) {
                props.savePassword(userId, user.password);
            }
        }
    }

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

    // render() {
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
                        }}>Zmień hasło</h2>
                        <form name="form" onSubmit={handleSubmit}>
                            <FormGroup
                                className={'form-group' + (submitted && !user.password ? ' has-passwordValid' : '')}>
                                <TextField variant="outlined"
                                           style={formInput}
                                           type="password" name="password" label={"NOWE HASŁO"}
                                           onChange={handleChange} /*onInput={() => validatePassword(user)}*/
                                           error={passwordValid}/>
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
                                           type="password" name="passwordConfirm" label={"POWTÓRZ NOWE HASŁO"}
                                           onChange={handleChange} /*onInput={() => validatePassword(user)}*/
                                           error={passwordValid}/>
                                {submitted && !user.password &&
                                <FormHelperText error={true}>Hasło jest wymagane</FormHelperText>
                                }
                                {passwordValid &&
                                <FormHelperText error={true}>Hasła się różnią</FormHelperText>
                                }
                            </FormGroup>
                            <div className="form-group">
                                <button className="btn btn-primary pull-left" style={{
                                    width: 150,
                                    backgroundColor: "#184386", border: "0px",
                                    borderRadius: "10px",
                                    boxShadow: "0px 3px 6px #00000029"
                                }}>Wyślij
                                </button>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
    // }
};


// @ts-ignore
const mapStateToProps = (state: IToken) => ({});

const mapDispatch = {
    updatePassword: userActions.updatePassword,
    savePassword: userActions.savePassword,
};

export default connect(mapStateToProps, mapDispatch)(UpdatePassword);

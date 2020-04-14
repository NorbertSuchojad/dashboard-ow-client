import React, { useState } from "react";
import { FormGroup, FormHelperText, TextField } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { IToken, ISystemState } from "../../../_store/interfaces";
import { userActions } from "../../../_store/actions/user.actions";


const Login = (props: any) => {
    const [submitted, setSubmitted] = useState(false);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        company: '',
        password: '',
        passwordConfirm: ''
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        setSubmitted(true);
        if (user.email && user.password) {
            props.login(user)
            // authenticationActions.logIn(user);
        }
    }

    function handleChange(event: any) {
        const { name, value } = event.target;
        // const {user} = this.state;
        setUser({
            ...user,
            [name]: value
        })
        // validatePassword(user)
    }

    // render() {
    return (
        <form name="form" onSubmit={handleSubmit} >

            <FormGroup className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                <TextField variant="outlined"
                    type="text"
                    name="email" value={user.email}
                    style={{ backgroundColor: "#fff", borderRadius: "5px" }}
                    label="LOGIN/EMAIL"
                    onChange={handleChange} />
                {submitted && !user.email &&
                    <FormHelperText error={true}>LOGIN/EMAIL jest wymagany</FormHelperText>
                }

            </FormGroup>

            <FormGroup className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                <TextField variant="outlined"
                    type="password" name="password"
                    style={{ backgroundColor: "#fff", borderRadius: "5px" }}
                    label="HASŁO"
                    value={user.password}
                    onChange={handleChange} />

                {submitted && !user.password &&
                    <FormHelperText error={true}>HASŁO jest wymagane</FormHelperText>
                }
            </FormGroup>

            <div className="form-group" style={{marginTop: 10}}>

                <Link to="/register">
                    <button className="btn btn-primary pull-left" style={{
                        width: 150,
                        backgroundColor: "#184386", border: "0px",
                        borderRadius: "10px",
                        boxShadow: "0px 3px 6px #00000029"
                    }}>Rejestracja
                    </button>
                </Link>

                <Link
                    to="/resetPassword"
                    style={{
                        fontFamily: "sfuiMedium",
                        fontSize: "13px",
                        color: '#6A737D'
                    }}
                >
                    Zapomniałem hasło
                </Link>

                {/*<Link to="/register">Rejestracja</Link>*/}
                <button className="btn btn-primary pull-right" style={{
                    width: 150,
                    backgroundColor: "#114884",
                    borderRadius: "10px",
                    boxShadow: "0px 3px 6px #00000029"
                }}>Zaloguj
                </button>
            </div>
        </form>
    );
    // }
}


const mapStateToProps = (state: ISystemState) => ({
});

const mapDispatch = {
    login: userActions.login,
};

export default connect(mapStateToProps, mapDispatch)(Login);

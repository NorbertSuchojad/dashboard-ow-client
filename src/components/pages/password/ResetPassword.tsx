import React, {useState} from "react";
import {Container, FormGroup, FormHelperText, Grid, TextField} from "@material-ui/core";
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {ISystemState, IToken} from "../../../_store/interfaces";
import {userActions} from "../../../_store/actions/user.actions";
import CircularProgress from '@material-ui/core/CircularProgress';

interface IProps {
    loading: boolean,
    resetPassword: any
}

const ResetPassword = (props: IProps) => {
    const [submitted, setSubmitted] = useState(false);
    const [user, setUser] = useState({
        email: '',
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        setSubmitted(true);
        if (user.email) {
            // setLoading(true);
            props.resetPassword(user.email);
        }
    }

    function handleChange(event: any) {
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    // render() {
    return (
        <Container>
            <h1 style={{color: "#1B4C82", fontSize: 46, textAlign: "left"}}>OWapp</h1>
            <Grid container spacing={5}>
                <Grid item xl={3} md={3} sm={1} xs={1}/>
                <Grid item xl={6} md={6} sm={10} xs={10}>
                    <Grid item xl={12} md={12} xs={12} style={{paddingLeft: 20}}>
                        <h2 style={{
                            color: "#07358D",
                            marginBottom: 50,
                            textAlign: "left",
                            fontSize: 46
                        }}>Reset hasła </h2>
                        <form name="form" onSubmit={handleSubmit}>

                            <FormGroup className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                <TextField variant="outlined"
                                           type="text"
                                           name="email" value={user.email}
                                           style={{backgroundColor: "#fff", borderRadius: "5px"}}
                                           label="EMAIL"
                                           onChange={handleChange}/>
                                {submitted && !user.email &&
                                <FormHelperText error={true}>EMAIL jest wymagany</FormHelperText>
                                }

                            </FormGroup>

                            <div className="form-group" style={{marginTop: 10}}>

                                {/*<Link to="/register">Rejestracja</Link>*/}
                                <Link to="/login"
                                    className="btn btn-primary pull-left" style={{
                                    width: 150,
                                    backgroundColor: "#114884",
                                    borderRadius: "10px",
                                    boxShadow: "0px 3px 6px #00000029"
                                }}>Anuluj
                                </Link>

                                <button className="btn btn-primary pull-right" style={{
                                    width: 150,
                                    backgroundColor: "#114884",
                                    borderRadius: "10px",
                                    boxShadow: "0px 3px 6px #00000029"
                                }}>Wyślij
                                </button>
                            </div>
                        </form>
                    </Grid>
                    {props.loading &&  <CircularProgress style={{marginTop: 100}}/>}
                </Grid>
            </Grid>
        </Container>
    );
    // }
}


// @ts-ignore
const mapStateToProps = (state: ISystemState) => ({
    loading: state.loading
});

const mapDispatch = {
    resetPassword: userActions.resetPassword,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatch)(ResetPassword);

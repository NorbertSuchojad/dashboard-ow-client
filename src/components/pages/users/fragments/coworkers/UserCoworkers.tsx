import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { Container } from "reactstrap";
import { ICompany, ISystemState, IUser } from "../../../../../_store/interfaces";
import { connect } from "react-redux";
import AddCoworker from "./AddCoworker";
import SingleCoworker from "./SingleCoworker";
import { ADMIN, IPermissionTypes, MANAGER } from "../../../../../_store/constants/permission.constants";

interface IProps {
    currentCompany: ICompany,
    permission: IPermissionTypes,
}

class UserCoworkers extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);

        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: any) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        const { permission, currentCompany } = this.props;
        const contentAllowed = permission === ADMIN || permission === MANAGER;

        if (currentCompany && currentCompany.users)
            return (
                <Container fluid>
                    <Grid container spacing={5}>
                        {currentCompany.users.map((user: IUser, id: number) => {
                            return (
                                <SingleCoworker key={id} coworker={user} />
                            )
                        })}
                        {
                            contentAllowed &&
                            <AddCoworker company={currentCompany} onChange={this.handleChange} />
                        }
                    </Grid>
                </Container>
            );
        else {
            return (<div>
                <CircularProgress />
            </div>)
        }
    }
};

const mapStateToProps = (state: ISystemState) => ({
    currentCompany: state.currentCompanySelected,
    permission: state.permission,
});

const mapDispatch = {};
export default connect(mapStateToProps, mapDispatch)(UserCoworkers);

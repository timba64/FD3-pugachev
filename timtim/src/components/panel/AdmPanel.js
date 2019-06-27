import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import AutosTable from "./AutosTable";

class AdmPanel extends Component {

    render(){
        const { autos, auth } = this.props;

        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }

        return(
            <Container className="dashboard mt-5">
                <AutosTable autos={autos} />
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        autos: state.firestore.ordered.autos,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(
        mapStateToProps,
        null
    ),
    firestoreConnect([{ collection: "autos" }])
)(AdmPanel);
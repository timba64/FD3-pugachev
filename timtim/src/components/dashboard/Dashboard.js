import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import AutosList from "../autos/AutosList";
import Notifications from "./Notifications";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Dashboard extends Component {
    render() {
        const { autos, auth } = this.props;

        // if (!auth.uid) {
        //     return <Redirect to="/signin" />;
        // }
  
        return (
            <Container className="dashboard mt-5">
                <Row>
                    <Col xs={12} sm={8}>
                        <AutosList autos={autos} />
                    </Col>
                    <Col xs={12} sm={4}>
                        <Notifications />
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
//console.log(state);
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
)(Dashboard);
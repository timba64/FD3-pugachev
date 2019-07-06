import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import AutosList from "../autos/AutosList";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { compose } from "redux";

class Dashboard extends Component {
    render() {
        const { autos } = this.props;
console.log("render from Dashboard");

        if (! isLoaded (autos)) { return <div> Загрузка ... </ div> }
        if (isEmpty (autos))    { return <div> Список Todo пуст </ div> }

        return (
            <Container className="dashboard mt-5">
                <Row>
                    <Col sm={12}>
                        <AutosList autos={autos} />
                    </Col>
                </Row>
            </Container>
        );
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
)(Dashboard);
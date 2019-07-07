import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import AutosList from "../autos/AutosList";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import ReactLoading from 'react-loading';

class Dashboard extends Component {
    render() {
        const { autos } = this.props;
        if ( !isLoaded(autos) ) { return <Container><ReactLoading type='balls' color='#17a2b8' /></Container> }
        if ( isEmpty(autos) ) { return <Container><div> Список Todo пуст </ div></Container> }
console.log("render from Dashboard");
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
    connect( mapStateToProps ),
    firestoreConnect([{ collection: "autos", limit: 3 }])
)(Dashboard);
import React from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Container, Card } from 'react-bootstrap';

const AutoDetails = (props) => {
    const { auto, auth } = props;

    if (!auth.uid) {
        return <Redirect to="/signin" />;
    }

    if (auto) {
        return (
            <Container className="item-detail mt-5">
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>{auto.title}</Card.Title>
                <Card.Text>{auto.content}</Card.Text>
                    <p>Posted by {auto.authorFirstName} {auto.authorLastName}</p>
                    <p className="grey-text">3rd okt 2018.</p>
                </Card.Body>
                </Card>
            </Container>
        )
    } else {
        return (
            <Container className="item-detail mt-5">
                <p>Loading project...</p>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
console.log(state);
    const id = ownProps.match.params.id;
    const autos = state.firestore.data.autos;

    return {
      auto: autos ? autos[id] : null,
      auth: state.firebase.auth
    }
}
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
      collection: 'autos'
    }])
)(AutoDetails)

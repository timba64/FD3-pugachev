import React, { Component } from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { editAuto } from "../../store/actions/autoActions";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class AutoDetails extends Component {

    state = {
        id: this.props.id,
        title: "",
        content: ""
    }

    componentDidMount = () =>{
//console.log(this.props.auto);
        if(this.props.auto) {
            this.setState({title: this.props.auto.title});
            this.setState({content: this.props.auto.content});
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.editAuto(this.state);
        this.props.history.push('/panel');
    };

    render() {
        const { auto, auth } = this.props;
console.log(this.state);
        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }

        if (auto) {
            return (
                <Container className="item-detail mt-3">
                    <Form className="edit-form" onSubmit={this.handleSubmit}>
                        <h2 className="mb-3">Edit your advert</h2>
                        <Form.Group as={Row} controlId="title">
                            <Form.Label column sm="2">
                                Наименование
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" defaultValue={auto.title} onChange={this.handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="content">
                            <Form.Label column sm="2">
                                Описание
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="textarea" rows="3" defaultValue={auto.content} onChange={this.handleChange} />
                            </Col>
                        </Form.Group>
                        <Button variant="primary" type="submit">Edit</Button>
                    </Form>
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
}

const mapStateToProps = (state, ownProps) => {

    const id = ownProps.match.params.id;
    const autos = state.firestore.data.autos;

    return {
      auto: autos ? autos[id] : null,
      auth: state.firebase.auth,
      id: id
    }
}

const mapDispatchToProps = dispatch => {
    return {
      editAuto: (edauto) => dispatch(editAuto(edauto))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'autos'
    }])
)(AutoDetails)

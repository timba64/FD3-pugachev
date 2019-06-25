import React, { Component } from 'react';
import {Container, Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createAuto } from "../../store/actions/autoActions";

class CreateAuto extends Component {

    state = {
        title: '',
        content: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
          });
    };
    
    handleSubmit = e => {
        e.preventDefault();
        //console.log(this.state);
        this.props.createAuto(this.state);
    };

    render() {

        const { auth } = this.props;
        if (!auth.uid) {
          return <Redirect to="/signin" />;
        }

        return (
        <Container>
            <Form className="signin-form" onSubmit={this.handleSubmit}>
                <h2 className="mb-3">Create new advert</h2>
                <Form.Group as={Row}>
                    <Form.Label htmlFor="title" column sm="2">Title</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" id='title' onChange={this.handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label htmlFor="content" column sm="2">Description</Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" rows="3" id="content" onChange={this.handleChange} />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">Create</Button>
            </Form>
        </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth
    }
  }

const mapDispatchToProps = dispatch => {
    return {
      createAuto: (auto) => dispatch(createAuto(auto))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAuto);

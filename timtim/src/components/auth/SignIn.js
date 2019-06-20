import React, { Component } from 'react';
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import {Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
          });
    };
    
    handleSubmit = e => {
        e.preventDefault();
        //console.log(this.state);
        this.props.signIn(this.state);
    };

    render() {
        const { authError } = this.props;
        return (
        <Container>
            <Form className="signin-form" onSubmit={this.handleSubmit}>
                <h2 className="mb-3">Sign In</h2>
                <Form.Group as={Row}>
                    <Form.Label htmlFor="email" column sm="2">Email</Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" id='email' onChange={this.handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label htmlFor="password" column sm="2">Password</Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" id='password' onChange={this.handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                    <Col sm="12">
                        <Button variant="primary" type="submit">Login</Button>
                    </Col>
                </Form.Group>
                {authError ?
                    <Alert variant="danger">
                        <p>{authError}</p>
                    </Alert> : null
                }
            </Form>
        </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      signIn: (creds) => dispatch(signIn(creds))
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

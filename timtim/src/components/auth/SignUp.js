import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp, resetErrorAuth } from "../../store/actions/authActions";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        firstName: "",
        lastName: ""
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
          });
    };
    
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        this.props.signUp(this.state);
    };

    render() {
        const { auth, authError } = this.props;

        if (auth.uid) {
          return <Redirect to="/" />;
        }

        return (
        <Container>
            <Form className="signup-form" onSubmit={this.handleSubmit}>
                <h2 className="mb-3">Sign Up</h2>
                <p>If you want to take part in this project - sign up, please.</p>
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
                <Form.Group as={Row}>
                    <Form.Label htmlFor="firstName" column sm="2">First Name</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" id='firstName' onChange={this.handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label htmlFor="lastName" column sm="2">Last Name</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" id='lastName' onChange={this.handleChange} />
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

const mapStateToProps = state => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    };
  };
  
const mapDispatchToProps = (dispatch)=> {
    return {
        signUp: (creds) => dispatch(signUp(creds))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);
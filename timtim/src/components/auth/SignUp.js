import React, { Component } from 'react';
import {Container, Row, Col, Form, Button } from 'react-bootstrap';

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
        //this.props.SignUp(this.state);
    };

    render() {
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
                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </Container>
        )
    }
}

export default SignUp;
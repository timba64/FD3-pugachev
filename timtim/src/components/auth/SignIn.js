import React, { Component } from 'react';
import {Container, Row, Col, Form, Button } from 'react-bootstrap';

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
        console.log(this.state);
        //this.props.signIn(this.state);
    };

    render() {
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
                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </Container>
        )
    }
}

export default SignIn;

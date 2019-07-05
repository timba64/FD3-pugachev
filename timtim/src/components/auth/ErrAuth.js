import React from 'react';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import err from './error-auth';

const ErrAuth = () => {
    console.log('render from AboutPage');
    return (
        <Container>
            <div className="page-content">
                <h2>{err.title}</h2>
                <p>{err.content}</p>
                <p><Link to={'/'}>На главную</Link></p>
            </div>
        </Container>
    );
};

export default ErrAuth;
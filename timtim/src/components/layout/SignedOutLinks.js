import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const SignedOutLinks = () => {
  return (
    <Nav as="ul">
        <Nav.Item as="li"><Link to='/signup' className='nav-link'>Signup</Link></Nav.Item>
        <Nav.Item as="li"><Link to='/signin' className='nav-link'>Login</Link></Nav.Item>
    </Nav>
  )
}

export default SignedOutLinks;
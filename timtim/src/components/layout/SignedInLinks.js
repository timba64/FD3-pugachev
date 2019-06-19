import React from 'react';
import { Link } from 'react-router-dom';
import {Nav} from 'react-bootstrap';

import './SignedInLinks.css';

const SignedInLinks = () => {
  return (
    <Nav as="ul">
        <Nav.Item as="li"><Link to='/create' className='nav-link'>New Auto</Link></Nav.Item>
        <Nav.Item as="li"><Link to='/redo' className='nav-link'>Log Out</Link></Nav.Item>
        <Nav.Item as="li"><Link to='/redo' className="btn btn-profil">NN</Link></Nav.Item>
    </Nav>
  )
}

export default SignedInLinks;
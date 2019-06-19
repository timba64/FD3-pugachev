import React from "react";
import {Link} from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navibar = () => {
    return (

    <Navbar bg="light" expand="lg" className="shadow-sm border-bottom mb-3">
    <Navbar.Brand href="/">TIM-TIM</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav as="ul">
            <Nav.Item as="li"><Link to='/' className="nav-link">Home</Link></Nav.Item>
            <Nav.Item as="li"><Link to='/redo' className="nav-link">About</Link></Nav.Item>
        </Nav>
        <SignedInLinks />
        <SignedOutLinks />
    </Navbar.Collapse>
    </Navbar>

    )
  }
  
  export default Navibar;
import React from "react";
import {Link} from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from "react-redux";

const Navibar = (props) => {
    const { auth, profile } = props;
    const links = auth.uid ? (
        <SignedInLinks profile={profile} />
    ) : (
        <SignedOutLinks />
    );
    return (
        <Navbar bg="light" expand="lg" className="shadow-sm border-bottom mb-3">
            <Navbar.Brand href="/">TIM-TIM</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav as="ul">
                    <Nav.Item as="li"><Link to='/' className="nav-link">Home</Link></Nav.Item>
                    <Nav.Item as="li"><Link to='/redo' className="nav-link">About</Link></Nav.Item>
                </Nav>
                {links}
            </Navbar.Collapse>
        </Navbar>
    )
}
  
const mapStateToProps = state => {
    //console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    };
};

  export default connect(mapStateToProps)(Navibar);
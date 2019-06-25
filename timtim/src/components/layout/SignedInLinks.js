import React from 'react';
import { Link } from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

import './SignedInLinks.css';

const SignedInLinks = (props) => {
    return (
        <Nav as="ul">
            <Nav.Item as="li"><Link to='/create' className='nav-link'>New Auto</Link></Nav.Item>
            <Nav.Item as="li"><Link to='/' className='nav-link' onClick={props.signOut}>Log Out</Link></Nav.Item>
            <Nav.Item as="li">
                <Link to='/redo' className="btn btn-profil">{props.profile.initials}</Link>
            </Nav.Item>
        </Nav>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
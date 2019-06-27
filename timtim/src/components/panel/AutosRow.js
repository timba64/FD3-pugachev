import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { deleteAuto } from "../../store/actions/autoActions";

class AutosRow extends Component {

    static contextTypes = {
        router: PropTypes.object,
    };

    handleEditClick = (e) => {
        e.stopPropagation();
        console.log("handle Edit Click");
    };

    handleDelClick = (e) => {
        e.stopPropagation();
        this.props.deleteAuto(this.props.auto);
    };

    render() {

        return (
            <tr>
                <td>{this.props.ind}</td>
                <td>{this.props.auto.title}</td>
                <td>{this.props.auto.content}</td>
                <td>Table cell</td>
                <td>
                    <Link onClick={this.handleEditClick} to={`/auto/${this.props.auto.id}`}>
                        <Button as="span" variant="outline-secondary">Edit</Button>
                    </Link>
                </td>
                <td>
                    <Button onClick={this.handleDelClick} as="span" variant="outline-secondary">Del</Button>
                </td>
            </tr>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
      deleteAuto: (auto) => dispatch(deleteAuto(auto))
    }
}
  
export default connect(null, mapDispatchToProps)(AutosRow);
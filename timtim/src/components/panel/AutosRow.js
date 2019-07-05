import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';
import { deleteAuto } from "../../store/actions/autoActions";

class AutosRow extends React.PureComponent {

    handleDelClick = (e) => {
        e.stopPropagation();
        this.props.deleteAuto(this.props.auto);
    };

    render() {
console.log("render from AutosRow");
        return (
            <tr>
                <td>{this.props.ind}</td>
                <td>{this.props.auto.title}</td>
                <td>{this.props.auto.content}</td>
                <td><img src={this.props.auto.url || 'http://via.placeholder.com/200x150'} alt="Uploaded images" height="90" width="120"/></td>
                <td>
                    <Link to={`/auto/${this.props.auto.id}`}>
                        <Button as="span" variant="outline-secondary" className="btn-sm">Edit</Button>
                    </Link>
                </td>
                <td>
                    <Button onClick={this.handleDelClick} as="span" variant="outline-secondary" className="btn-sm">Del</Button>
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
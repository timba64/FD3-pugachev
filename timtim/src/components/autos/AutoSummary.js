import React from "react";
import moment from "moment";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import CardImg from '../../img/holder.png';

const AutoSummary = ({ auto }) => {
console.log('render from AutoSummary');
    return (
        <div className="col-sm-6 col-md-4">
            <Card className="card-auto" style={{ marginBottom: '1rem' }}>
                <Link to={`/auto/${auto.id}`}>
                    <Card.Img variant="top" src={CardImg} alt="Card image" />
                </Link>
                <Card.Body>
                <Card.Title>{auto.title}</Card.Title>
                <Card.Text>{auto.content}</Card.Text>
                    <p>Posted by {auto.authorFirstName} {auto.authorLastName}</p>
                    <p className="grey-text">{moment(auto.createdAt.toDate()).calendar()}</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AutoSummary;
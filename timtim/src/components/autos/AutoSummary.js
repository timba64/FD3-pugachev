import React from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import CardImg from '../../img/holder.png';

const AutoSummary = ({ auto }) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
        <Link to={`/auto/${auto.id}`}>
            <Card.Img variant="top" src={CardImg} alt="Card image" />
        </Link>
        <Card.Body>
        <Card.Title>{auto.title}</Card.Title>
        <Card.Text>{auto.content}</Card.Text>
            <p>Posted by {auto.authorFirstName} {auto.authorLastName}</p>
            <p className="grey-text">3rd okt 2018</p>
        </Card.Body>
    </Card>
  );
};

export default AutoSummary;
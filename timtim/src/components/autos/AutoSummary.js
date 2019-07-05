import React from "react";
import moment from "moment";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import './AutoSummary.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const AutoSummary = ({ auto }) => {
console.log('render from AutoSummary');
    return (
        <div className="col-sm-6 col-md-4">
            <Card className="card-auto" style={{ marginBottom: '1rem' }}>
                <Link to={`/auto/${auto.id}`}>
                    <Card.Img variant="top" src={auto.url||'http://via.placeholder.com/400x300'} alt="Card image" />
                </Link>
                <OverlayTrigger
                    placement="auto"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                        <Tooltip id='onCardTip'>
                          Чтобы оставить объявление - зарегистрируйтесь!...
                        </Tooltip>
                      }
                >
                    <Card.Body>
                        <Card.Title>{auto.title}</Card.Title>
                        <Card.Text>{auto.content}</Card.Text>
                        <p>Posted by {auto.authorFirstName} {auto.authorLastName}</p>
                        <p className="grey-text">{moment(auto.createdAt.toDate()).calendar()}</p>
                    </Card.Body>
                </OverlayTrigger>
            </Card>
        </div>
    );
};

export default AutoSummary;
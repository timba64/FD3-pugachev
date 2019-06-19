import React from "react";
import {CardDeck} from 'react-bootstrap';
import AutoSummary from './AutoSummary';

const AutosList = ({autos}) => {
    return (
        <div className="project-list section">
           <CardDeck> 

           { autos && autos.map(item => {
                return (                   
                    <AutoSummary auto={item} key={item.id} /> 
                )
            })} 
            </CardDeck>
        </div>
    );
};
  
export default AutosList;
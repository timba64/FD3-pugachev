import React from "react";
import Row from 'react-bootstrap/Row';
import AutoSummary from './AutoSummary';

const AutosList = ({autos}) => {
console.log('render from AutosList');
    return (
        <div className="project-list section">
           <Row> 
                { autos && autos.map(item => {
                    return (                   
                        <AutoSummary auto={item} key={item.id} /> 
                    )
                })} 
            </Row>
        </div>
    );
};
  
export default AutosList;
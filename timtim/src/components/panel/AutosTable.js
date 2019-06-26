import React from "react";
import Table from 'react-bootstrap/Table';
import AutosRow from './AutosRow';

const AutosTable = ({autos}) => {
console.log(autos);
    return(
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Control</th>
                    <th>Control</th>
                </tr>
            </thead>
            <tbody>
                
            { autos && autos.map((item, i) => {
                        return (                   
                            <AutosRow auto={item} ind={i+1} key={item.id} /> 
                        )
                    })
                }

            </tbody>
        </Table>
    )
}

export default AutosTable;
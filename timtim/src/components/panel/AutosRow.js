import React from "react";

const AutosRow = ({ auto, ind }) => {
    return (
        <tr>
            <td>{ind}</td>
            <td>{auto.title}</td>
            <td>{auto.content}</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
        </tr>
    );
  };
  
  export default AutosRow;
import React from 'react';
import './withColorBackground.css';

/* function withColorBackground(color) {
    return function(Component) {
      return props => (
        <div style={{backgroundColor:color}}>
          <Component {...props} />
        </div>
      );
    };
} */

const withColorBackground = colors => Component => props => {
    let txt = props.children;
    colors.forEach(color => {
      txt = <div style={{border: "10px solid " + color, padding: "10px"}}>{txt}</div>;
    });
    return txt;
};

export { withColorBackground };
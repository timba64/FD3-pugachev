import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {
    static propTypes = {
        pagename: PropTypes.string.isRequired,
        children: PropTypes.string.isRequired,
        colors: PropTypes.array.isRequired,
    }

    render(){
        let code=this.props.children;
        this.props.colors.forEach(color => {
            code=<div style={{border: "10px solid "+color, padding:"10px"}}>{code}</div>
        });

        return (
            <div className="rainbow-frame">
                <h2 className='frame-name'>{this.props.pagename}</h2>
                <div className='wrapper'>
                    {code}
                </div>
            </div>
        );
    }
}

export default RainbowFrame;
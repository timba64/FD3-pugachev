import React from 'react';
import PropTypes from 'prop-types';

import './BR2JSX.css';

class BR2JSX extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
    }

    render() {
        let word=this.props.text.split(/<br *\/?>/);
        let parts=[];
        word.forEach((element, i) => {
            if(i)
            parts.push(<br key={i+"a"} />);
            parts.push(<span key={i}>{element}</span>);
        });

        return <div className="kubik">{parts}</div>
    }

}

export default BR2JSX;
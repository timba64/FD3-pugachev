import React from 'react';
import PropTypes from 'prop-types';
import {clientEvents} from '../utils/events';
import {EV_ADDNEW_CLICKED} from '../utils/variables';

import './AddNew.css';

class AddNew extends React.PureComponent {

    static displayName = 'AddNew';
  
    static propTypes = {
        disaddnewbut: PropTypes.bool.isRequired,
    };

    addNewClicked = () => {
        clientEvents.emit(EV_ADDNEW_CLICKED);
    }

    render(){
        //console.log('рендер из AddNew');
        return(
            <div className='add-new'>
                <input type="button" disabled={this.props.disaddnewbut} value="Добавить клиента" onClick={this.addNewClicked} />
            </div>
        );
    }

};

export default AddNew;
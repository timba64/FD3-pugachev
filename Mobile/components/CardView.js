import React from 'react';
import PropTypes from 'prop-types';
import {clientEvents} from '../utils/events';

//import {EV_ADDNEW_CLICKED} from '../utils/variables';

import './CardView.css';

class CardView extends React.PureComponent {

    static displayName = 'CardView';
  
    static propTypes = {
        disaddnewbut: PropTypes.bool.isRequired,
        viewclients: PropTypes.object.isRequired,
    };

    // addNewClicked = () => {
    //     clientEvents.emit(EV_ADDNEW_CLICKED, this.state.oneclient.id);
    // }

    render(){
        console.log("рендер из CardView");
        return(
  
            <div className='card-view'>
                <p><span className="card-edit_row-title">Фамилия</span>
                <span className='card-edit_input'>{this.props.viewclients.family}</span></p>
                <p><span className="card-edit_row-title">Имя</span>
                <span className='card-edit_input'>{this.props.viewclients.name}</span></p>
                <p><span className="card-edit_row-title">Отчество</span>
                <span className='card-edit_input'>{this.props.viewclients.secname}</span></p>
                <p><span className="card-edit_row-title">Баланс</span>
                <span className='card-edit_input'>{this.props.viewclients.balance}</span></p>
            </div>

        );
    }

};

export default CardView;
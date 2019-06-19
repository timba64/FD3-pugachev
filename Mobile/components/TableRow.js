import React from 'react';
import PropTypes from 'prop-types';
import {clientEvents} from '../utils/events';
import {EV_DEL_CLICKED, EV_EDIT_CLICKED, EV_ROW_CLICKED} from '../utils/variables';

import './TableRow.css';

class TableRow extends React.PureComponent {

    static displayName = 'TableRow';
  
    static propTypes = {
        oneclient: PropTypes.object.isRequired,
        rowactive: PropTypes.number.isRequired,
        disaddnewbut: PropTypes.bool.isRequired,
    };

    editClicked = (EO) => {
        EO.stopPropagation();
        clientEvents.emit(EV_EDIT_CLICKED,this.props.oneclient.id);
    }

    delClicked = (EO) => {
        EO.stopPropagation();
        clientEvents.emit(EV_DEL_CLICKED,this.props.oneclient.id);
    }

    clickRow = () => {
        clientEvents.emit(EV_ROW_CLICKED,this.props.oneclient.id);
    }

    render(){
        console.log('рендер из TableRow - ' + this.props.oneclient.id);
        var clientObj = this.props.oneclient;
        let clientCells = Object.keys(clientObj).map( (el, i) => {
            if(el == "id"){
                return; 
            } else if (el == "editbut") {
                return <td key={i} className="centr"><input type="button" value="Редактировать" onClick={this.editClicked} /></td>
            } else if (el == "delbut") {
                return <td key={i} className="centr"><input type="button" disabled={this.props.disaddnewbut} value="Удалить" onClick={this.delClicked} /></td>
            } else if (el == "balance") {
                return <td key={i} className="centr">{clientObj[el]}</td>
            } else if (el == "status") {
                return <td key={i} className="centr"><span className={clientObj[el] == "active" ? "status status-active" : "status"}></span></td>
            }else {
                return <td key={i}>{clientObj[el]}</td>
            }
        });

        return(
            <tr className={this.props.rowactive == this.props.oneclient.id ? 'clients-row row-active' : 'clients-row'} data-id={clientObj.id} onClick={this.clickRow}>
                {clientCells}
            </tr>
        );
    }

}

export default TableRow;
import React from 'react';
import PropTypes from 'prop-types';
import {clientEvents} from '../utils/events';
import {EV_CLIENT_SAVE, EV_CANCEL_EDIT, EV_CLIENT_EDIT_SAVE} from '../utils/variables';

import './CardEdit.css';

class CardEdit extends React.PureComponent {

    static displayName = 'CardEdit';
  
    static propTypes = {
        viewclients: PropTypes.object.isRequired,
        disaddnewbut: PropTypes.bool.isRequired,
        addnewclient: PropTypes.bool.isRequired,
        nextid: PropTypes.number.isRequired,
        rowactive: PropTypes.number.isRequired,
    };

    state = {
        rowclient: this.props.viewclients,
    };

    componentWillReceiveProps = (newProps) => {
        if (newProps.viewclients !== this.props.viewclients) {
            this.setState({rowclient: newProps.viewclients});
        }
    }

    newFamilyRef = null;
    newNameRef = null;
    newSecNameRef = null;
    newBalanceRef = null;

    setFamilyRef = (ref) => {
        this.newFamilyRef=ref;
    }
    setNameRef = (ref) => {
        this.newNameRef=ref;
    }
    setSecNameRef = (ref) => {
        this.newSecNameRef=ref;
    }
    setBalanceRef = (ref) => {
        this.newBalanceRef=ref;
    }
    
    clientSave = () => {
        if ( this.newSecNameRef.value && this.newNameRef.value ) {
            let newClient={
                id:this.props.nextid,
                family: this.newFamilyRef.value,
                name: this.newNameRef.value,
                secname: this.newSecNameRef.value,
                balance: parseInt(this.newBalanceRef.value),
                status: "active",  // упрощение в целях ускорения
                editbut: true,
                delbut: true
            };
            clientEvents.emit(EV_CLIENT_SAVE, newClient);
            //{id:101, family:"Иванов", name: "Иван", secname: "Иванович", balance:200, status: true, editbut: true, delbut: true},
        }
    }

    clientEditedSave = () => {
        if ( this.newSecNameRef.value && this.newNameRef.value ) {
            let editedClient={
                id: this.state.rowclient.id,
                family: this.newFamilyRef.value,
                name: this.newNameRef.value,
                secname: this.newSecNameRef.value,
                balance: parseInt(this.newBalanceRef.value),
                status: this.state.rowclient.status,
                editbut: this.state.rowclient.editbut,
                delbut: this.state.rowclient.delbut,
            };
            clientEvents.emit(EV_CLIENT_EDIT_SAVE, editedClient);
        }
    }

    cancelEdit = () => {
        clientEvents.emit(EV_CANCEL_EDIT);
    }

    render(){
        console.log('рендер из CardEdit');

        return(
            <div key={this.props.viewclients.id} className='card-edit'>
                <p><span className="card-edit_row-title">Фамилия</span>
                <input className='card-edit_input' type="text" name="cl-family" defaultValue={this.props.addnewclient ? "" : this.state.rowclient.family} ref={this.setFamilyRef} /></p>
                <p><span className="card-edit_row-title">Имя</span>
                <input className='card-edit_input' type="text" name="cl-name" defaultValue={this.props.addnewclient ? "" : this.state.rowclient.name} ref={this.setNameRef} /></p>
                <p><span className="card-edit_row-title">Отчество</span>
                <input className='card-edit_input' type="text" name="cl-secname" defaultValue={this.props.addnewclient ? "" : this.state.rowclient.secname} ref={this.setSecNameRef} /></p>
                <p><span className="card-edit_row-title">Баланс</span>
                <input className='card-edit_input' type="number" name="cl-balance" defaultValue={this.props.addnewclient ? 0 : this.state.rowclient.balance} ref={this.setBalanceRef} /></p>
                <p>
                    <input className='card-edit_but' type="button" disabled={!this.props.disaddnewbut}  defaultValue="Save" onClick={this.props.addnewclient ?  this.clientSave : this.clientEditedSave} />
                    <input className='card-edit_but' type="button" defaultValue="Cancel" onClick={this.cancelEdit} />
                </p>
            </div>
        );
    }

};

export default CardEdit;
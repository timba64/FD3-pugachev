import React from 'react';
import PropTypes from 'prop-types';
import {clientEvents, allFilters} from '../utils/events';
import {EV_DEL_CLICKED, EV_EDIT_CLICKED, EV_ADDNEW_CLICKED, EV_ROW_CLICKED,
    EV_CLIENT_SAVE, EV_CANCEL_EDIT, EV_CLIENT_EDIT_SAVE, EV_CHANGE_COMPANY, EV_FILTER_CLIENTS} from '../utils/variables';

import CompanyFilter from './CompanyFilter';
import ClientFilter from './ClientFilter';
import ClientTable from './ClientTable';
import AddNew from './AddNew';
import CardView from './CardView';
import CardEdit from './CardEdit';

import './MobCompany.css';

class MobCompany extends React.PureComponent {

    static displayName = 'MobCompany';
  
    static propTypes = {
        shopname: PropTypes.string.isRequired,
        comparr: PropTypes.array.isRequired, // array of companies
        showeditform: PropTypes.bool.isRequired,  //show form of client or not
        filtername: PropTypes.array.isRequired, //array names of filters
        headertablenames: PropTypes.object.isRequired, 
        clientsarr: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number.isRequired,
              family: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              secname: PropTypes.string,
              balance: PropTypes.number.isRequired,
              status: PropTypes.string.isRequired,
              editbut: PropTypes.bool.isRequired,
              delbut: PropTypes.bool.isRequired,
            })
        ),
    };

    state = {
        clientsarr: this.props.clientsarr, // массив клиентов
        disaddnewbut: false, // отключена ли кнопка Добавить клиента
        rowactive: 0, // код активной строки
        cardmode: null, // show cardView or cardEdit
        addnewclient: null,  // добавляем нового или редактируем старого клиента
        comparr: this.props.comparr,
        filterClientsCode: 'all',
    }

    componentDidMount = () => {
        clientEvents.addListener(EV_EDIT_CLICKED,this.clientEdited);
        clientEvents.addListener(EV_DEL_CLICKED,this.clientDeleted);
        clientEvents.addListener(EV_ADDNEW_CLICKED,this.addNewClicked);
        clientEvents.addListener(EV_ROW_CLICKED,this.rowClicked);
        clientEvents.addListener(EV_CLIENT_SAVE,this.clientSave);
        clientEvents.addListener(EV_CANCEL_EDIT,this.cancelEdit);
        clientEvents.addListener(EV_CLIENT_EDIT_SAVE,this.clientEditedSave);
        allFilters.addListener(EV_CHANGE_COMPANY,this.changeCompany);
        allFilters.addListener(EV_FILTER_CLIENTS,this.filterClients);
        this.nextId();
    };
    
    componentWillUnmount = () => {
        clientEvents.removeListener(EV_EDIT_CLICKED,this.clientEdited);
        clientEvents.removeListener(EV_DEL_CLICKED,this.clientDeleted);
        clientEvents.removeListener(EV_ADDNEW_CLICKED,this.addNewClicked);
        clientEvents.removeListener(EV_ROW_CLICKED,this.rowClicked);
        clientEvents.removeListener(EV_CLIENT_SAVE,this.clientSave);
        clientEvents.removeListener(EV_CANCEL_EDIT,this.cancelEdit);
        clientEvents.removeListener(EV_CLIENT_EDIT_SAVE,this.clientEditedSave);
        allFilters.removeListener(EV_CHANGE_COMPANY, this.changeCompany);
        allFilters.removeListener(EV_FILTER_CLIENTS, this.filterClients);
    };

    filterClients = (par) => {
        this.setState({filterClientsCode: par});
        //console.log(par);
    };

    getActive = (nameact) => {
        let isAct;
        this.state.comparr.forEach(el => {;
            if(el.name == nameact) {
                isAct = el.act;
            }
        });
        return isAct;
    };

    changeCompany = (nameact) => {
        let isActive = this.getActive(nameact);
        if(!isActive){
            // let copyComp = [...this.state.comparr];
            // let newComp = copyComp.map((el)=>{  // map - это ведь тоже новый массив ?
                let newComp = this.state.comparr.map((el)=>{
                if(el.name == nameact){
                el.act = true;
                return el;
                } else {
                el.act = false;
                return el;
                }
            });
            this.setState({comparr: newComp});
        }
    };
    
    clientSave = (newClient) => {
        let copyClients = [...this.state.clientsarr, newClient];
        this.setState({clientsarr: copyClients, cardmode: 0, disaddnewbut: false});
    };

    clientEditedSave = (editedClient) => {
        let index = this.findedIndex(editedClient.id);

        let copyClients = this.state.clientsarr.slice();
        copyClients.splice(index, 1, editedClient);
        this.setState({clientsarr: copyClients, cardmode: 1});
    };

    cancelEdit = () => {
        this.setState({disaddnewbut: false, addnewclient: false, cardmode: 0});
    };

    clientEdited = (par) => {
        this.setState({disaddnewbut: true, cardmode: 2, addnewclient: false, rowactive: par});
    };

    clientDeleted = (code) => {
        let index = this.findedIndex(code);

        let copyClients = this.state.clientsarr.slice();
        copyClients.splice(index, 1);
        this.setState({clientsarr: copyClients, rowactive: 0, cardmode: null});
    };

    addNewClicked = () => {
        this.setState({disaddnewbut: true, addnewclient: true, cardmode: 2});
    };

    rowClicked = (par) => {
        this.setState({rowactive: par, cardmode: 1, disaddnewbut: false});
    };

    findedIndex = (edClient) => {
        return this.state.clientsarr.findIndex(function(client) {
            return client.id == edClient;
        });
    };

    nextId = () => {
        let max=[];
        for(let i = 0; i < (this.state.clientsarr).length; i++) {
            max.push(this.state.clientsarr[i].id);
        }
        return Math.max.apply(null, max) + 5;
    };

    render(){
        console.log('рендер из MobCompany');
        let item = {};
        if(this.state.rowactive) {
            item = this.state.clientsarr.find( (el) => {
                return el.id == this.state.rowactive;
            });
        }

        return(
            <div className='client-list'>
                <h1 className='page-name'>{this.props.shopname}</h1>
                <CompanyFilter comparr={this.state.comparr} />
                <ClientFilter filtername={this.props.filtername} />
                <ClientTable
                    headertablenames={this.props.headertablenames}
                    clientsarr={this.state.clientsarr}
                    rowactive={this.state.rowactive}
                    disaddnewbut={this.state.disaddnewbut}
                    filterClientsCode={this.state.filterClientsCode}
                />
                <AddNew
                    disaddnewbut={this.state.disaddnewbut}
                /> 
                <div className='client-card'>
                    {
                        (this.state.cardmode == 1) &&
                        <CardView
                            disaddnewbut={this.state.disaddnewbut}
                            viewclients={item}
                        />
                    }
                    {
                        (this.state.cardmode == 2) &&
                        <CardEdit
                            disaddnewbut={this.state.disaddnewbut}
                            addnewclient={this.state.addnewclient}
                            nextid={this.nextId()}
                            rowactive={this.state.rowactive}
                            viewclients={item}
                        />
                    }
                </div>
            </div>
        );
    }

}

export default MobCompany;
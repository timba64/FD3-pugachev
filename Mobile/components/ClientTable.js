import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';

import './ClientTable.css';

class ClientTable extends React.PureComponent {

    static displayName = 'ClientTable';
  
    static propTypes = {
        headertablenames: PropTypes.object.isRequired,
        rowactive: PropTypes.number.isRequired,
        disaddnewbut: PropTypes.bool.isRequired,
        filterClientsCode: PropTypes.string.isRequired,
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

    render(){
        //console.log('рендер из ClientTable');
        let nameValues = this.props.headertablenames;
        let titleRow = Object.keys(nameValues).map( (el, i) => {  // title of table
            if(el == "id") return;
            return <th key={i} className={'head-' + el}>{nameValues[el]}</th>;
        });
        
        var clientArr = this.props.clientsarr.filter( (client) => { // create filtered array of obj
            let filtro = this.props.filterClientsCode; // may be - all, block or active
            switch(filtro){
                case 'all':
                    return true;
                break;
                default:
                    return client.status == filtro;
            }   
        });

        let clientRows = clientArr.map( (client) => 
            <TableRow
                key={client.id}
                disaddnewbut={this.props.disaddnewbut}
                oneclient={client}
                rowactive={this.props.rowactive}
            />
        );

        return(
            <div className='client-table'>
                <h4 className='client-table_title'>Данные клиентов</h4>

                <table className='table-clients'>
                    <tbody>
                        <tr className='head-row'>
                            {titleRow}
                        </tr>
                        {clientRows}
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ClientTable;
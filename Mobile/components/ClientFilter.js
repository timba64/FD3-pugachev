import React from 'react';
import PropTypes from 'prop-types';
import {allFilters} from '../utils/events';
import {EV_FILTER_CLIENTS} from '../utils/variables';
import './ClientFilter.css';

class ClientFilter extends React.PureComponent {

    static displayName = 'ClientFilter';
  
    static propTypes = {
        filtername: PropTypes.array.isRequired,
    };

    // state = {
    //     filteractive: 'Все', 
    // }

    filterClients = (EO) => {
        //console.log(EO.target.dataset.id);
        allFilters.emit(EV_FILTER_CLIENTS, EO.target.dataset.id, );
    }

    render(){
        //console.log('рендер из ClientFilter');
        var buttomClients=this.props.filtername.map( (el) =>
            <input key={el.code} className='but-filter' type='button'  data-id={el.code} onClick={this.filterClients} defaultValue={el.name} />
        );

        return(
            <div className='client-filter'>
                {buttomClients}
                <hr className='separ' />
            </div>
        );
    }

}

export default ClientFilter;
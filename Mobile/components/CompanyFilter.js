import React from 'react';
import PropTypes from 'prop-types';
import {allFilters} from '../utils/events';
import {EV_CHANGE_COMPANY} from '../utils/variables';

import './CompanyFilter.css';

class CompanyFilter extends React.PureComponent {

    static displayName = 'CompanyFilter';
  
    static propTypes = {
        comparr: PropTypes.array.isRequired,
    };

    // state = {
    //     comparr: this.props.comparr, 
    // }

    // componentWillReceiveProps = (newProps) => {
    //     if (newProps.comparr !== this.props.comparr) {
    //         this.setState({comparr: newProps.comparr});
    //     }
    // }

    changeCompany = (EO) => {
        // send name of active company
        allFilters.emit(EV_CHANGE_COMPANY, EO.target.value, );
    };

    render(){
        //console.log('рендер из CompanyFilter');
        let buttomCompany=this.props.comparr.map( (el) =>
            <input key={el.code} className='but-filter' type='button' onClick={this.changeCompany} defaultValue={el.name} />
        );

        let activecomp = this.props.comparr.filter( (el) =>
            el.act
        );

        return(
            <div className='company-filter'>
                {buttomCompany}
                <h3>Компания {activecomp[0].name}</h3>
                <hr className='separ' />
            </div>
        );
    }

}

export default CompanyFilter;
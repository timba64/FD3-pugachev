import React from 'react';
import PropTypes from 'prop-types';

import './ProductRow.css';

class ProductRow extends React.Component {

    static displayName = 'ProductRow';

    static propTypes = {
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        clr: PropTypes.bool.isRequired,
        editProduct: PropTypes.number.isRequired,
        addProduct: PropTypes.number.isRequired,
        cbCodeRow: PropTypes.func.isRequired, // func for delete row
        cbColRow: PropTypes.func.isRequired, // func add color to selected row
        cbEdRow: PropTypes.func.isRequired,
        notSaved: PropTypes.number.isRequired,
    };

    // click on row make row colored
    colRow = () => {
        if(!this.props.notSaved) {
            this.props.cbColRow(this.props.code);
        }
    }

    // click on button edit
    edRow = (EO) => {
        EO.stopPropagation();
        this.props.cbEdRow(this.props.code);
    }

    // click on button del
    delRow = (EO) => {
        EO.stopPropagation();
        this.props.cbCodeRow(this.props.code);
    }

    render() {
        let classes, attr;
        let inpts = [];
        if(this.props.clr) {
            classes = 'prod-row red-row';
        } else {
            classes = 'prod-row';
        }

        if(this.props.editProduct){
            attr = {
                type: 'button',
                value: 'Delete',
                disabled: 'disabled',
            };
        } else {
            attr = {
                type: 'button',
                value: 'Delete',
            };
        }


        if(this.props.editProduct == this.props.code || this.props.addProduct) {
            inpts.push(<input key={1} type='button' disabled value='Delete' data-id={this.props.code} onClick={this.delRow} />); 
            inpts.push(<input key={2} type='button' disabled value='Edit' data-id={this.props.code} onClick={this.edRow} />);
        } else {
            inpts.push(<input key={1} {...attr} data-id={this.props.code} onClick={this.delRow} />);
            inpts.push(<input key={2} type='button' value='Edit' data-id={this.props.code} onClick={this.edRow} />);
        }

        return ( 
            <tr className={classes} data-idrow={this.props.code} onClick={this.colRow}>
                <td>{this.props.name}</td>
                <td className = 'td-price'>{this.props.price}</td>
                <td className = 'td-qty'>{this.props.count}</td>
                <td className = 'prod-img'> 
                    <img src = {this.props.img} />
                </td>
                <td>
                    {inpts}
                </td>
            </tr>
        )
    }
};

export default ProductRow;
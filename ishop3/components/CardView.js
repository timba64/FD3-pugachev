import React from 'react';
import PropTypes from 'prop-types';

import './CardView.css';

class CardView extends React.Component {

    static propTypes = {
        citem: PropTypes.object.isRequired,
        selectedCode: PropTypes.bool.isRequired,
        cbAddNewProduct: PropTypes.func.isRequired,
    }

    addNewProduct = () => {
        this.props.cbAddNewProduct();
    }

    render() {

        return (
            <div className="wr-card">
                <div className="button_add-new">
                    <input type="button" defaultValue="New Product" onClick={this.addNewProduct} />
                </div>
                { this.props.selectedCode &&
                <div className="card-view">
                    <p><span className="card-edit_row-title" >Название</span><span>{this.props.citem.name}</span></p>
                    <p><span className="card-edit_row-title" >Цена</span><span>{this.props.citem.price}</span></p>
                    <p><span className="card-edit_row-title" >Количество</span><span>{this.props.citem.count}</span></p>
                </div>
                }
            </div> 
        )
    }
}

export default CardView;
import React from 'react';
import PropTypes from 'prop-types';

import './CardEdit.css';

class CardEdit extends React.Component {

    static propTypes = {
        citem: PropTypes.object.isRequired,
        cbSaveRow: PropTypes.func.isRequired,
        cbCancEdit: PropTypes.func.isRequired,
        cbChangeInput: PropTypes.func.isRequired, // tell parent that input is changed
        addProduct: PropTypes.number.isRequired,
    }

    state = {
        elName: this.props.citem.name,
        elPrice: this.props.citem.price,
        elCount: this.props.citem.count,
        addProd: this.props.addProduct, // this is new product
        validBut: false, //отключена ли кнопка
        nameValid: this.validateName(this.props.citem.name),
        priceValid: this.validatePrice(this.props.citem.price),
        countValid: this.validateCount(this.props.citem.count),
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.citem.name !== this.props.citem.name) {
            this.setState({elName: newProps.citem.name, elPrice: newProps.citem.price, elCount: newProps.citem.count});
        }
    }

    componentDidMount = () => {
        // если редактирование, то кнопка save сразу включена
            this.setState({validBut: this.state.addProd == 1 ? false : true}); 
    }

    cancEdit = () => {
        this.props.cbCancEdit(this.props.citem.code);
    }

    clickSave = () => {
        let tempo = true, validObj = {
            nameValid: this.state.nameValid,
            priceValid: this.state.priceValid,
            countValid: this.state.countValid
        }
        for(let i in validObj) {
            if( !validObj[i] ) {
                tempo = false;
                break;
            }
            tempo = true;
        }
        if(tempo) this.saveRow();
    }

    saveRow = () => {
        if(this.props.addProduct){
            this.props.cbSaveRow({
                name: this.state.elName,
                price: +(this.state.elPrice),
                count: +(this.state.elCount),
            });
        } else {
            this.props.cbSaveRow({
                ...this.props.citem,
                name: this.state.elName,
                price: +(this.state.elPrice),
                count: +(this.state.elCount),
            });
        }
    }

    changeName = (EO) => {
        let name = EO.target.value;
        let valid = this.validateName(name);
        this.setState({addProd: 2, elName: EO.target.value, nameValid: valid}, this.validButton);
        this.props.cbChangeInput();
    }

    validateName(name){
        let pat = /^[A-Za-z0-9_-]{3,10}$/;
        return name.match(pat) ? true : false;
    }

    changePrice = (EO) => {
        let price = EO.target.value;
        let valid = this.validatePrice(price);
        this.setState({addProd: 2, elPrice: EO.target.value, priceValid: valid}, this.validButton);
        this.props.cbChangeInput();
    }

    validatePrice(price){
        let pat = /^[1-9][0-9]?[0-9]?[0-9]?$/;
        return String(price).match(pat) ? true : false;
    }

    changeCount = (EO) => {
        let count = EO.target.value;
        let valid = this.validateCount(count);
        this.setState({addProd: 2, elCount: EO.target.value, countValid: valid}, this.validButton);
        this.props.cbChangeInput();
    }

    validateCount(count){
        let pat = /^[1-9][0-9]?[0-9]?$/;
        return String(count).match(pat) ? true : false;
    }

    validButton(){
        this.setState({validBut: this.state.nameValid && this.state.priceValid && this.state.countValid});
    }

    render() {

        return (
            <div className="card-edit">
                <p><span className="card-edit_row-title" >Название</span><input type="text" name="prodname" value={this.state.addProd == 1 ? "" : this.state.elName} onChange={this.changeName} /><span className="valid-field">{this.state.nameValid ? "" : "только буквы, цифры и тире, мин 3 символа"}</span></p>
                <p><span className="card-edit_row-title" >Цена</span><input type="text" name="prodprice" value={this.state.elPrice} onChange={this.changePrice}  /><span className="valid-field">{this.state.priceValid ? "" : "от одной до 4 цифр > 0"}</span></p>
                <p><span className="card-edit_row-title" >Кол-во</span><input type="text" name="prodcount" value={this.state.elCount} onChange={this.changeCount} /><span className="valid-field">{this.state.countValid ? "" : "от одной до 3 цифр > 0"}</span></p>
                <p><input type="button" disabled={!this.state.validBut}  defaultValue="Save" onClick={this.clickSave} /><input type="button" defaultValue="Cancel" onClick={this.cancEdit} /></p>
            </div>
        )
    }
}

export default CardEdit;
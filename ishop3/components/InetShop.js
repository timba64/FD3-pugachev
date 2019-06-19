import React from 'react';
import PropTypes from 'prop-types';

import './InetShop.css';
import ProductRow from './ProductRow';
import CardView from './CardView';
import CardEdit from './CardEdit';

class InetShop extends React.Component {

    static displayName = 'InetShop';
  
    static propTypes = {
      shopname: PropTypes.string.isRequired,
      tablehead: PropTypes.array.isRequired,
      defproducts: PropTypes.array.isRequired,
    };

    state = {
      products:this.props.defproducts,
      selectedCode: 0,
      cardmode: 1,  // 1 - view, 2 - edit
      editedCode: 0, // code of editing product or 0
      addProduct: 0, // 0 - don`t edited, 1 - button add New pushed, 2 - input changed
      notSaved: 0, // show that you should save product - 1 or 0 
    }

    // set code of colored row
    colRow = (par) => {
      if(this.state.addProduct) {
        console.log(this.state.addProduct);
        this.setState({selectedCode: 0, editedCode: 0});
      } else {
        this.setState({selectedCode: par, cardmode: 1, editedCode: 0});
      }
    }

    // set mode edit of card and code selected row
    edRow = (par) => {
      if(this.state.notSaved) {
          this.edRowConfirm(par);
      } else {
        this.setState({cardmode: 2, selectedCode: par, editedCode: par, addProduct: 0, notSaved: 0});
      }
    }

    edRowConfirm = (par) => {
        let quest = confirm("Вы не закончили редактирование, изменения не сохранены !!!");
        if (quest) {
          this.setState({cardmode: 2, selectedCode: par, editedCode: par, addProduct: 0, notSaved: 0});
        }
    }

    // go out from edit mode in CardEdit
    cancEdit = (par) => {
      this.setState({editedCode: 0, cardmode: 1, selectedCode: 0, addProduct: 0, notSaved: 0});
    }

    // save edited row from CardEdit
    saveRow = (newItem) => {
      var tempo;
      if(this.state.addProduct) {
        let newInd = Object.keys(this.state.products).length;
        let newCode = this.codeGen(newInd);
        newItem.code = newCode + 1;
        newItem.img = "img/nophoto.jpg";
        tempo = this.state.products;
        tempo[newInd] = newItem;
      } else {
        tempo = this.state.products.map( (el) => {
          return el.code == newItem.code ? newItem : el
        });
      }
      this.setState({products: tempo, cardmode: 1, selectedCode: 0, editedCode: 0, notSaved: 0, addProduct: 0});
    }

    codeGen = (par) => {
      let ind = Object.keys(this.state.products).length
      let row = this.state.products[par - 1].code;
      return row;
    }

    delRowConfirm = (par) => {
      let res = confirm('Вы хотите удалить товар с кодом - ' + par + '?');
      if(res){
        this.delRowProduct(par);
      }
    }
  
    delRowProduct = (par) => {
      let arrProduct = this.state.products.filter ( (el) => {
        return el.code !== par;
      });

      this.setState({products: arrProduct, selectedCode: 0, cardmode: 1});
    }

    addNewProduct = () => {
      this.setState({addProduct: 1, cardmode: 2, notSaved: 0, selectedCode: 0});
    }

    changeInput = () => {
      this.setState({notSaved: 1});
    }

    emptyObj = () => {
      return {"name":"","code":0,"price": 0,"count": 0,"img":"img/nophoto.jpg"};
    }

    render() {
      var tableProducts=this.state.products.map( (el) =>
        <ProductRow
          key={el.code}
          code={el.code}
          name={el.name}
          price={el.price}
          count={el.count}
          img={el.img}
          clr={el.code == this.state.selectedCode ? true : false}
          editProduct={this.state.editedCode}
          addProduct={this.state.addProduct}
          cbCodeRow={this.delRowConfirm}
          cbColRow={this.colRow}
          cbEdRow={this.edRow}
          notSaved={this.state.notSaved}
        />
      );
      
      if(this.state.editedCode){
        var item = this.state.products.find( (el) => {
          return el.code == this.state.editedCode
        });
      } else if(this.state.selectedCode) {
        var item = this.state.products.find( (el) => {
          return el.code == this.state.selectedCode
        });
      } else {
        var item = this.emptyObj();
      }

      return (
        <div className='InetShop'>
          <h2 className='shop-name'>{this.props.shopname}</h2>
          <table className='table-prods'>
            <tbody>
              <tr className='head-row'>
                <th className='head-name'>{this.props.tablehead[0].name}</th>
                <th className='head-price'>{this.props.tablehead[1].price}</th>
                <th className='qty'>{this.props.tablehead[2].qty}</th>
                <th className='head-img'>{this.props.tablehead[3].img}</th>
                <th >{this.props.tablehead[4].ctrl}</th>
              </tr>
              {tableProducts}
            </tbody>
          </table>
          <div className="card-product">
            {
              (this.state.cardmode == 1) &&
              <CardView citem={item} 
                cbAddNewProduct={this.addNewProduct}
                selectedCode={this.state.selectedCode == 0 ? false : true } />
            }
            {
              (this.state.cardmode == 2) &&
              <CardEdit
                citem={item}
                cbSaveRow={this.saveRow}
                cbCancEdit={this.cancEdit}
                cbChangeInput={this.changeInput}
                addProduct={this.state.addProduct}
              />
            }
          </div>
        </div>
      )
    }
}

  export default InetShop;
var InetShop = React.createClass({

    displayName: 'InetShop',
  
    propTypes: {
      shopname: React.PropTypes.string.isRequired,
      tablehead: React.PropTypes.array.isRequired,
      defproducts: React.PropTypes.array.isRequired,
    },

    getInitialState: function() {
      return { products:this.props.defproducts, selectedCode: null };
    },

    colRow: function(par) {
      this.setState({selectedCode: par});
    },

    delRowConfirm: function(par) {
      var res = confirm('Вы хотите удалить товар с кодом - ' + par + '?');
      if(res){
        this.delRowProduct(par);
      }
    },
  
    delRowProduct: function (par) {
      par = + par;
      var arrProduct = this.state.products.filter ( (el) => {
        return el.code !== par;
      });
      this.setState({products: arrProduct});
    },

    render: function() {

      var tableProducts=this.state.products.map( (el) => 
        React.createElement(ProductRow, {
          key: el.code,
          code: el.code,
          name: el.name,
          price: el.price,
          count: el.count,
          img: el.img,
          clr: el.code == this.state.selectedCode ? true : false,
          cbCodeRow: this.delRowConfirm,
          cbColRow: this.colRow
        })
      );
      
      return React.DOM.div( {className:'InetShop'}, 
        React.DOM.h2({className:'shop-name'}, this.props.shopname ),
        React.DOM.table({className:'table-prods'},
          React.DOM.tbody({},
            React.DOM.tr({className:'head-row'}, 
              React.DOM.th({className:'head-name'},'Наименование'),
              React.DOM.th({className:'head-price'},'Цена'),
              React.DOM.th({className:'qty'},'Кол-во'),
              React.DOM.th({className:'head-img'},'Изображение'),
              React.DOM.th(null, 'Контрол'),
            ),
            tableProducts,
          )
        )
      );
    },
  
  });
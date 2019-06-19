var InetShop = React.createClass({

    displayName: 'InetShop',
  
    propTypes: {
      shopname: React.PropTypes.string.isRequired,
      tablehead: React.PropTypes.array.isRequired,
      products: React.PropTypes.array.isRequired,
    },
  
    render: function() {

        var tabHead=[];
        tabHead.push(React.DOM.div( {key: 1, className:'head-name'}, "Наименование"),);
        tabHead.push(React.DOM.div( {key: 2, className:'head-price'}, "Цена"),);
        tabHead.push(React.DOM.div( {key: 3, className:'qty'}, "Кол-во"),);
        tabHead.push(React.DOM.div( {key: 4, className:'head-img'}, "Изображение"),);

        var tableProducts=this.props.products.map( (el,i) => 
            React.DOM.div({key:el.code,className:'prod-row'},
                React.DOM.div({className:'prod-name'},el.name),
                React.DOM.div({className:'prod-price'},el.price),
                React.DOM.div({className:'qty'},el.count),
                React.DOM.div({className:'prod-img'},
                    React.DOM.img({'data-id':i,src:el.img}),
                ), 
            ),
        );
      
      return React.DOM.div( {className:'InetShop'}, 
        React.DOM.h2( {className:'shop-name'}, this.props.shopname ),
        React.DOM.div( {className:'head-row'}, tabHead ),
        React.DOM.div( {className:'table-prods'}, tableProducts ),
      );
    },
  
  });
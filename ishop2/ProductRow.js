var ProductRow = React.createClass({

    displayName: 'ProductRow',

    propTypes: {
        code: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        count: React.PropTypes.number.isRequired,
        img: React.PropTypes.string.isRequired,
        clr: React.PropTypes.bool.isRequired,
        cbCodeRow: React.PropTypes.func.isRequired,
        cbColRow: React.PropTypes.func.isRequired,
    },

    colRow: function() {
        this.props.cbColRow(this.props.code);
    },

    delRow: function() {
        this.props.cbCodeRow(this.props.code);
    },

    render: function() {
        var classes;
        if(this.props.clr) {
            classes = 'prod-row red-row';
        } else {
            classes = 'prod-row';
        }

        return React.DOM.tr({className:classes, 'data-idrow':this.props.code, onClick:this.colRow}, 
            React.DOM.td(null, this.props.name),
            React.DOM.td({className:'td-price'}, this.props.price),
            React.DOM.td({className:'td-qty'}, this.props.count),
            React.DOM.td({className: 'prod-img'}, 
                React.DOM.img({src: this.props.img})
            ),
            React.DOM.td(null,
                React.DOM.input( {type:'button',value:'Delete', 'data-id':this.props.code, onClick:this.delRow} ),    
            )
        )
    }
});
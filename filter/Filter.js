var Filter = React.createClass({

    displayName: 'Filter',

    propTypes: {
        shopname: React.PropTypes.string.isRequired,
        wordlist: React.PropTypes.array.isRequired,
      },

    getInitialState: function () {
        return {
            option: false,
            list: this.props.wordlist,
            strFilter: ""
        };
    },

    inptChange: function(e) {
        e.preventDefault();
        this.setState( {strFilter: e.target.value}, this.mainHandling );
    },

    chBoxClick: function(e) {
        this.setState( {option: e.target.checked}, this.mainHandling );
    },

    setDefVal: function() {
        this.setState( {option: false, strFilter: ""}, this.mainHandling );
    },

    mainHandling: function() {
        var str = this.state.strFilter, els = this.props.wordlist.slice();

        // если надо - фильтруем
        if (str) {
            var newLists = [];
            newLists = els.filter(function(el){
                if( ~ el.name.indexOf(str) ){
                    return true;
                }
            });
        } else {
            newLists = els;
        }

        // если надо - сортируем
        if (this.state.option) {
            newLists.sort(
                function(a, b){
                    //return new Intl.Collator().compare('a.name', 'b.name');
                    return a.name.localeCompare(b.name);
                }
            );
        } 

        // обновимся
        this.setState( {list: newLists} );
    },

    render: function() {

        var vpFilter = this.state.list.map( (el) => 
            React.DOM.li({key:el.code, className: "item"}, el.name),
        );

        return React.DOM.div( {className: 'f-row'},
            React.DOM.h2 ( {className: 'section-title'}, this.props.shopname ),
            React.DOM.div( {className: 'row row-el'},
                React.DOM.input({type:'checkbox', checked:this.state.option, onClick: this.chBoxClick}),
                React.DOM.input({type:'text', placeholder:"выбeрите строку", value: this.state.strFilter, onChange: this.inptChange}),
                React.DOM.button({type:'reset',className: "va-but", onClick: this.setDefVal}, "Сброс"),
            ),
            React.DOM.div( {className: 'row'},
                React.DOM.ul({className: 'my-sel'}, 
                    vpFilter ),   
            )
        );
    },

});
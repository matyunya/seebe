var PricesForm = React.createClass({
  propTypes: {
    sections: React.PropTypes.array,
    tickets: React.PropTypes.array,
    prices: React.PropTypes.array,
    row_prices: React.PropTypes.array
  },
  getInitialState: function() {
    return {
      row_prices: []
    }
  },
  render: function() {
    var style = {
      textAlign: 'center',
      lineHeight: '18px',
      minWidth: '300px',
      maxWidth: '400px'
    }
    return (
      <span>
        <input type="number" name="set_price" placeholder="500" value={this.props.priceToSet} onChange={this.props.setPrice} />
        <a href="javascript:void(0)" className="button" onClick={this.props.changePrices}>Указать цену</a>
        <div className="test" style={style}>
          {this.props.sections.map(function(section) {
              return <PriceSection section={section}
                        key={section.id}
                        prices={[0,0,0,0,0,0,0,0,0,0,0,0]}
                        row_prices={this.props.row_prices}
                        tickets={[]}
                        priceToSet={this.props.priceToSet}
                        setPrice={this.props.setPrice}
                        changePrices={this.props.changePrices}
                        passSeatRow={this.props.passSeatRow}
                     />;
            }.bind(this))}
        </div>
      </span>
      )
  }
});
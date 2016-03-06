var TicketPricesForm = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.hall[0].price_types
    }
  },

  render: function() {
    var rows = [];
    for (var i=1; i <= this.state.value; ++i) {
      rows.push(<PriceInput key={i} value={i} id={i} updatePrices={this.props.updatePrices} />)
    }
    return (
      <div>
        <h5>Цены по умолчанию</h5>
        <div className="row">
          {rows}
        </div>
      </div>
      );
  }
});

var PriceInput = React.createClass({
  rowName: function() {
    return 'concert[prices][]'
  },

  render: function() {
    return <div className="large-12 columns">
            <label>{this.props.value}-й тип цены</label>
            <input type="number" name={this.rowName()} id="concert_price" data={this.props.id} onBlur={this.props.updatePrices} />
          </div>
  }
});
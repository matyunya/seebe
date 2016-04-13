var TicketPricesForm = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.hall[0].price_types
    }
  },

  render: function() {
    var rows = [];
    for (var i=1; i <= this.state.value; ++i) {
      rows.push(<PriceInput key={i} value={this.props.prices[i-1]} id={i} updatePrices={this.props.updatePrices} />)
    }

    if (this.props.dancefloor) {
      rows.push(
      <DancefloorPriceInput
        key={i}
        value={this.props.dancefloor_price}
        id={i}
        updateDancefloorPrice={this.props.updateDancefloorPrice}
      />);
    }

    return (
      <div>
        <h5>Цены по умолчанию</h5>
        <div className='row'>
          {rows}
        </div>
      </div>
      );
  }
});

var PriceInput = React.createClass({
  render: function() {
    return <div className='large-12 columns'>
            <label>{this.props.id}-й тип цены</label>
            <input
            type='number'
            name='concert[prices][]'
            value={this.props.value}
            id='concert_price'
            data={this.props.id}
            onChange={this.props.updatePrices}
            onBlur={this.props.updatePrices}
            />
          </div>
  }
});

var DancefloorPriceInput = React.createClass({
  render: function() {
    return <div><div className='large-12 columns'>
            <label>Цена на танцполе</label>
            <input
              type='number'
              name='concert[dancefloor_price]'
              id='concert_dancefloor_price'
              data={this.props.id}
              value={this.props.value}
              onChange={this.props.updateDancefloorPrice}
            />
          </div>
          </div>
  }
});
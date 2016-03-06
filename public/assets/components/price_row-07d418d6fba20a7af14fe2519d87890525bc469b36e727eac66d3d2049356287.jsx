var PriceRow = React.createClass({
  propTypes: {
    row: React.PropTypes.object,
    tickets: React.PropTypes.array,
    prices: React.PropTypes.array,
    sectionName: React.PropTypes.string,
    row_prices: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      selected: false
    }
  },

  colors: [
    '#BF0B0B',
    '#DE3A3A',
    '#FF763B',
    '#D14D00',
    '#852034',
    '#D0B709',
    '#E3CF7F',
    '#647349',
    '#7A8650',
    '#345E1A',
    '#11C9C0',
    '#B7BCB1',
    '#121610'
  ],

  getPrice: function(seat) {
    if (this.props.row_prices) {
      return this.props.row_prices[seat-1];
    } else {
      return this.props.prices[this.props.row.prices[seat-1]];  
    }
  },

  selectRow: function() {
    this.setState({selected: !this.state.selected});
  },

  seats: function() {
    var seats = [];
    for (var i=1; i < this.props.row.seats + 1; i++) {
      var seat = i;
        seats.push(
          <PriceSeat 
            key={i}
            seat={i}
            row={this.props.row.number}
            rowId={this.props.row.id}
            seat={i}
            price={this.getPrice(i)}
            sectionName={this.props.sectionName}
            sectionId={this.props.sectionId}
            selected={this.state.selected}
            passSeatRow={this.props.passSeatRow}
          />
          );
      }

    return seats;
  },

  render: function() {
    return <div>
        <small onClick={this.selectRow} style={{cursor: "pointer", padding: "5px"}}>
          {this.props.row.number}&nbsp;ряд
        </small> 
        {this.seats()}
         <small onClick={this.selectRow}  style={{cursor: "pointer", padding: "5px"}}>
          {this.props.row.number}&nbsp;ряд
        </small>
      </div>;
  }
});
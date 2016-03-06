var Row = React.createClass({
  propTypes: {
    row: React.PropTypes.object,
    tickets: React.PropTypes.array,
    prices: React.PropTypes.array,
    sectionName: React.PropTypes.string,
    row_prices: React.PropTypes.array
  },

  //TODO: отсортировать цвета по цене
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

  taken: function(row, seat) {
    seat = this.props.tickets.filter(function(id, ticket) {
      return (ticket[0] == row && ticket[1] == seat);
    }.bind(row, seat));

    return seat.length > 0;
  },

  getColor: function(row, seat) {
    var price = this.props.row_prices ? this.props.row_prices[seat-1]/100 : this.props.row.prices[seat-1];
    return this.colors[price];
  },

  getPrice: function(seat) {
    if (this.props.row_prices) {
      return this.props.row_prices[seat-1];
    } else {
      return this.props.prices[this.props.row.prices[seat-1]];  
    }
  },

  seats: function() {
    var seats = [];
    for (var i=1; i < this.props.row.seats + 1; i++) {
      var seat = i;
      var color = this.taken(this.props.row.number, i) ? '#E0E0E0' : this.getColor(this.props.row.number, i);
        seats.push(
          <Seat 
            key={i}
            seat={i}
            row={this.props.row.number}
            color={color}
            taken={this.taken(this.props.row.number, i)}
            seat={i}
            price={this.getPrice(i)}
            sectionName={this.props.sectionName}
            sectionId={this.props.sectionId}
          />
          );
      }

    return seats;
  },

  render: function() {
    return <div><small>{this.props.row.number}</small> 
      {this.seats()}
       <small>{this.props.row.number}</small>
    </div>;
  }
});
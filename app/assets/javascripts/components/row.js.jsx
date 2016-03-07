var Row = React.createClass({
  propTypes: {
    row: React.PropTypes.object,
    tickets: React.PropTypes.array,
    prices: React.PropTypes.array,
    sectionName: React.PropTypes.string,
    row_prices: React.PropTypes.array
  },

  taken: function(row, seat) {
    seat = this.props.tickets.filter(function(id, ticket) {
      return (ticket[0] == row && ticket[1] == seat);
    }.bind(row, seat));

    return seat.length > 0;
  },

  getInitialState: function() {
    return {
      selected: false
    }
  },

  getPrice: function(seat) {
    if (!this.props.row_prices) {
      return this.props.prices[this.props.row.prices[seat-1]]; 
    }

    prices = this.props.row_prices.filter(function(a) {
        return a.seat === seat;
      }.bind(seat))

    return (prices.length > 0) ? prices[0].price : this.props.prices[this.props.row.prices[seat-1]];
  },

  selectEntireRow: function() {
    this.setState({selected: !this.state.selected});
  },

  seats: function() {
    var seats = [];
    for (var i=1; i < this.props.row.seats + 1; i++) {
      var seat = i;

        seats.push(
          <Seat 
            key={i}
            seat={i}
            rowId={this.props.row.id}
            row={this.props.row.number}
            selected={this.state.selected}
            taken={this.taken(this.props.row.number, i)}
            seat={i}
            price={this.getPrice(i)}
            sectionName={this.props.sectionName}
            sectionId={this.props.sectionId}
            setSelected={this.props.setSelected}
          />
          );
      }

    return seats;
  },

  render: function() {
    return <div><small onClick={this.selectEntireRow} style={{cursor:"pointer"}}>{this.props.row.number}</small> 
      {this.seats()}
       <small onClick={this.selectEntireRow} style={{cursor:"pointer"}}>{this.props.row.number}</small> 
    </div>;
  }
});
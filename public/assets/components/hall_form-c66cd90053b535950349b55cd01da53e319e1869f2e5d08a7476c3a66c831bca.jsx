var HallForm = React.createClass({
  propTypes: {
    halls: React.PropTypes.array
  },

  getInitialState: function() {
     return {
        hall_id: this.props.halls[0].id,
        selected_seats: [],
        priceToSet: '',
        row_prices: []
     };
  },

  selectHall: function(event) {
    this.setState({hall_id: event.target.value})
  },

  getSections: function() {
    var hall = this.props.halls.filter(function (h) {
      return h.id == this.state.hall_id
    }.bind(this));

    return hall[0].sections;
  },

  processSeats: function(seats, price) {
    return seats.map(function(s) {return price}.bind(price));
  },

  changePrices: function() {
    prices = this.state.selected_seats.map(function(seats, row) {
      return {
        row_id: row,
        prices: this.processSeats(seats, this.state.priceToSet)
      };
    }.bind(this));

    this.setState({
      row_prices: Array.prototype.concat.call(this.state.row_prices, prices),
      selected_seats: Array.prototype,
      priceToSet: this.state.priceToSet
    });
  },

  passSeatRow: function(row, seat) {
    seats = this.state.selected_seats;

    if (!seats[row]) {
      seats[row] = [];
    }

    if (seats[row].indexOf(seat) !== -1) {
      seats[row].splice(seats[row].indexOf(seat), 1);
    } else {
      seats[row].push(seat);  
    }

    this.setState({
      priceToSet: this.state.priceToSet, 
      selected_seats: seats, 
      hall_id: this.state.hall_id,
      row_prices: this.state.row_prices
    });

  },

  setPrice: function(e) {
    this.setState({
      priceToSet: e.target.value,
      selected_seats: this.state.selected_seats,
      hall_id: this.state.hall_id,
      row_prices: this.state.row_prices
    });
  },

  componentDidUpdate: function(props) {
    if (props.price !== this.props.price) {
      this.setState({selected_seats: []});
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
      <div>
        <input type="number" name="set_price" placeholder="500" />
        <select name="concert[hall_id]" onChange={this.selectHall}>
          {this.props.halls.map(function(hall) {
            return <option value={hall.id} key={hall.id}>{hall.name}</option>;
          })}
        </select>
        <PricesForm sections={this.getSections()}
         key={this.state.hall_id}
         tickets={[]}
         prices={[]}
         row_prices={this.state.row_prices}
         changePrices={this.changePrices}
         priceToSet={this.state.priceToSet}
         setPrice={this.setPrice}
         passSeatRow={this.passSeatRow}
        />
      </div>
      )
  }
});
var HallForm = React.createClass({
  propTypes: {
    halls: React.PropTypes.array,
    concert_id: React.PropTypes.number,
    hex: React.PropTypes.string,
    hall_id: React.PropTypes.number,
    prices: React.PropTypes.array,
    dancefloor_price: React.PropTypes.number,
    tickets: React.PropTypes.array
  },

  getInitialState: function() {
    var hall_id = (this.props.hall_id) ? this.props.hall_id : this.props.halls[0].id;

    return {
      hall_id: hall_id,
      row_prices: [],
      prices: this.props.prices,
      selected: [],
      dancefloor_price: this.props.dancefloor_price
    }
  },

  changeHall: function(event) {
    this.setState({hall_id: event.target.value});
  },

  getSections: function() {
    return this.props.halls.filter(function(h) {return h.id == this.state.hall_id}.bind(this))[0].sections.reverse;
  },

  hasDancefloor: function() {
    var sections = this.getSections();

    var dancefloor = sections.filter(function(s) {
      return s.dancefloor;
    });

    return dancefloor.length > 0;
  },

  halls: function(hall) {
    return hall.id == this.state.hall_id;
  },

  updatePrices: function(e) {
    var prices = this.state.prices;
    prices[e.target.attributes.data.value - 1] = e.target.value;
    this.setState({prices: prices});
  },

  updateDancefloorPrice: function(e) {
    this.setState({dancefloor_price: e.target.value});
  },

  setSelected: function(row, seat) {
    selected = this.state.selected;
    if (!selected[row]) {
      selected[row] = []; 
    }

    selected[row][seat] = !selected[row][seat];
    this.setState({selected: selected})
  },

  filterRowPrices: function(seat, row_id) {
    prices = this.state.row_prices;

    if (prices.length > 0) {
      prices.filter(function(p) {
        return p.seat !== seat && p.row_id !== row_id;
      }.bind(seat, row_id));
    }

    prices.push({seat: seat, row_id: row_id, price: this.state.priceToSet});
    
    return prices;
  },

  setPrices: function(e) {
    this.state.selected.map(function(row, r) { 
      row.map(function(seat, s) {
        $.post({
          url: '/ticket/custom',
          dataType: 'json',
          data: {price: {seat: s, row_id: r, price: this.state.priceToSet, hex: this.props.hex}},
          cache: false,
          success: function(data) {
            this.setState({row_prices: this.filterRowPrices(s, r)});
          }.bind(this, s, r),
          error: function(xhr, status, err) {
            console.error('error', status, err.toString());
          }.bind(this)
        });
      }.bind(this));
    }.bind(this));
  },

  changePriceToSet: function(e) {
    this.setState({priceToSet: e.target.value})
  },

  render: function() {
    var rows = [];

    return (
      <div>
        <select name="concert[hall_id]" id="concert_hall_id" onChange={this.changeHall} value={this.state.hall_id}>
          {this.props.halls.map((hall)=>
            <option value={hall.id} key={hall.id}>{hall.name}</option>
          )}
        </select>
        <TicketForm sections={this.getSections()} tickets={[]} prices={this.state.prices} row_prices={this.state.row_prices} setSelected={this.setSelected} /> 
        <label>Укажите цену для выбранных мест</label>
        <input type="number" name="set_price" id="set_price" value={this.state.priceToSet} onChange={this.changePriceToSet} />
        <button type="button" onClick={this.setPrices} className="tiny button">Применить</button>
        <TicketPricesForm 
          id={this.state.hall_id}
          hall={this.props.halls.filter(this.halls)}
          tickets={this.props.tickets}
          key={this.state.hall_id}
          updatePrices={this.updatePrices}
          updateDancefloorPrice={this.updateDancefloorPrice}
          dancefloor={this.hasDancefloor()}
          dancefloor_price={this.state.dancefloor_price}
          prices={this.props.prices}
        />
      </div>
    );
  }
});
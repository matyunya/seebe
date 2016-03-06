var HallForm = React.createClass({
  propTypes: {
    halls: React.PropTypes.array,
    concert_id: React.PropTypes.number
  },

  getInitialState: function() {
    return {
      hall_id: this.props.halls[0].id,
      row_prices: [],
      prices: this.props.prices,
      selected: []
    }
  },

  change: function(event) {
    this.setState({hall_id: event.target.value});
  },

  getSections: function() {
    return this.props.halls.filter(function(h) {return h.id == this.state.hall_id}.bind(this))[0].sections;
  },

  halls: function(hall) {
    return hall.id == this.state.hall_id;
  },

  updatePrices: function(e) {
    var prices = this.state.prices;
    prices[e.target.attributes.data.value - 1] = e.target.value;
    this.setState({prices: prices});
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
          data: {price: {seat: s, row_id: r, price: this.state.priceToSet}},
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
        <select name="concert[hall_id]" id="concert_hall_id" onChange={this.change} value={this.state.hall_id}>
          {this.props.halls.map((hall)=>
            <option value={hall.id} key={hall.id}>{hall.name}</option>
          )}
        </select>
        <TicketForm sections={this.getSections()} tickets={[]} prices={this.state.prices} row_prices={this.state.row_prices} setSelected={this.setSelected} /> 
        <label>Укажите цену</label>
        <input type="number" name="set_price" id="set_price" value={this.state.priceToSet} onChange={this.changePriceToSet} />
        <button type="button" onClick={this.setPrices}>Применить</button>
        <TicketPricesForm id={this.state.hall_id} hall={this.props.halls.filter(this.halls)} key={this.state.hall_id} updatePrices={this.updatePrices} />
      </div>
    );
  }
});
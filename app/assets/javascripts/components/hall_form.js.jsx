var HallForm = React.createClass({
  propTypes: {
    halls: React.PropTypes.array,
  },
  getInitialState: function() {
    return {
      value: 1
    }
  },
  change: function(event) {
    this.setState({value: event.target.value});
  },
  halls: function(hall) {
    return hall.id == this.state.value;
  },
  render: function() {
    var rows = [];

    return(
       <div>
           <select name="concert[hall_id]" id="concert_hall_id" onChange={this.change} value={this.state.value}>
              {this.props.halls.map((hall)=>
                <option value={hall.id} key={hall.id}>{hall.name}</option>
              )}
           </select>
           <TicketPricesForm id={this.state.value} hall={this.props.halls.filter(this.halls)} key={this.state.value} />
       </div>
    );
  }
});

var TicketPricesForm = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.hall[0].price_types
    }
  },
  render: function() {
    var rows = [];
    for (var i=1; i <= this.state.value; ++i) {
      rows.push(<PriceInput key={i} value={i} />)
    }
    return <div className="row">{rows}</div>;
  }
});

var PriceInput = React.createClass({
  rowName: function() {
    return 'concert[prices][]'
  },
  render: function() {

    return <div className="large-12 columns">
            <label>{this.props.value} тип цены</label>
            <input type="text" name={this.rowName()} id="concert_price" />
          </div>
  }
});
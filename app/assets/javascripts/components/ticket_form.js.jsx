var TicketForm = React.createClass({
  propTypes: {
    sections: React.PropTypes.array,
    tickets: React.PropTypes.string,
    prices: React.PropTypes.array
  },
  getInitialState: function() {
     return {
         value: this.props.sections[0].id,
         row: this.props.sections[0].rows[0].number,
         seat: this.props.sections[0].rows[0].seats[0]

     }
  },
  change: function(event) {
    this.setState({value: event.target.value});
  },
  sections: function(section) {
    return section.id == this.state.value;
  },
  render: function() {
    return (
      <div>
        <label>Секция</label>
        <select name="ticket[section_id]" id="ticket_section_id" onChange={this.change} value={this.state.value}>
          {this.props.sections.map(function(section) {
            return <option value={section.id} key={section.id}>{section.name}</option>;
          })}
        </select>
        <RowForm section={this.props.sections.filter(this.sections)} tickets={this.props.tickets} prices={this.props.prices} />
      </div>
          )
  }
});

var RowForm = React.createClass({
  propTypes: {
    section: React.PropTypes.array,
    tickets: React.PropTypes.string,
    prices: React.PropTypes.array
  },
  getInitialState: function() {
    return {
      section: [],
      value: this.props.section[0].rows[0].number
    }
  },
  getDefaultProps: function() {
    return {
      section: []
    }
  },
  change: function(event) {
    this.setState({value: event.target.value});
  },
  rows: function(row) {
    return row.number == this.state.value;
  },
  render: function() {
    var rows = [];
    var length = 0;
    if (this.props.section[0].rows != null) {
      length = this.props.section[0].rows.length
    }
    for (var i=1; i <= length; ++i) {
      rows.push(<option key={i} value={i}>{i}</option>)
    }
    return <div>
            <label>Ряд</label>
            <select name="ticket[row]" id="ticket_row" onChange={this.change}>
            {rows}
           </select>
           <SeatForm onChange={this.onChangeSeat} value={this.state.seat} row={this.props.section[0].rows.filter(this.rows)} tickets={this.props.tickets} prices={this.props.prices} />
           </div>;
  }
});

var SeatForm = React.createClass({
  propTypes: {
    row: React.PropTypes.array,
    tickets: React.PropTypes.string,
    prices: React.PropTypes.array
  },
  render: function() {
    var rows = [];
    var length = 0;

    if (this.props.row[0] != null) {
      length = this.props.row[0].seats
    }
    for (var i=1; i <= length; ++i) {
      var seat = '[' + this.props.row[0].number + ',' + i + ']';
      if (this.props.tickets.indexOf(seat) < 0) {
        var priceType = this.props.row[0].prices[i-1];
        rows.push(<option key={i} value={i}>{i} {this.props.prices[priceType]} р.</option>);
      }
    }
    return <div><label>Место</label><select name="ticket[seat]" id="ticket_seat" onChange={this.props.onChangeSeat} value={this.props.value}>{rows}</select></div>;
  }
});

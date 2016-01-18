var TicketForm = React.createClass({
  propTypes: {
    sections: React.PropTypes.array,
    tickets: React.PropTypes.string
  },
  getInitialState: function() {
     return {
         value: 8
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
        <RowForm section={this.props.sections.filter(this.sections)} tickets={this.props.tickets} />
      </div>
          )
  }
});

var RowForm = React.createClass({
  propTypes: {
    section: React.PropTypes.array,
    tickets: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      section: []
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
            <select name="ticket[row_id]" id="ticket_section_id" onChange={this.change}>
            {rows}
           </select>
           <SeatForm row={this.props.section[0].rows.filter(this.rows)} tickets={this.props.tickets} />
           </div>;
  }
});

var SeatForm = React.createClass({
  propTypes: {
    row: React.PropTypes.array,
    tickets: React.PropTypes.string
  },
  getInitialState: function() {
     return {
         row: []
     }
  },
  change: function(event) {
    this.setState({value: event.target.value});
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
        rows.push(<option key={i} value={i}>{i}</option>);
      }
    }
    return <div><label>Место</label><select name="ticket[seat]" id="ticket_seat" onChange={this.change} >{rows}</select></div>;
  }
});

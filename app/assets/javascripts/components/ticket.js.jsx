var Ticket = React.createClass({
  propTypes: {
    band: React.PropTypes.string,
    row: React.PropTypes.number,
    seat: React.PropTypes.number,
    date: React.PropTypes.string
  },

  render: function() {
    return (
      <div>
        <div>{this.props.band} ({this.props.date}) Ряд: {this.props.row} Место: {this.props.seat}</div>
      </div>
    );
  }
});

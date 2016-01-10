var Ticket = React.createClass({
  propTypes: {
    band: React.PropTypes.string,
    row: React.PropTypes.string,
    seat: React.PropTypes.string,
    date: React.PropTypes.date
  },

  render: function() {
    return (
      <div>
        <div>{this.props.band} ({this.props.date}) Ряд: {this.props.row} Место: {this.props.seat}</div>
      </div>
    );
  }
});

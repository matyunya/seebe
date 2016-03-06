var Ticket = React.createClass({
  propTypes: {
    band: React.PropTypes.string,
    row: React.PropTypes.number,
    seat: React.PropTypes.number,
    date: React.PropTypes.string,
    price: React.PropTypes.number
  },

  render: function() {
    return (
      <div>
        <div>{this.props.band} ({this.props.date}) Ряд: {this.props.row} Место: {this.props.seat} Цена: {this.props.price}</div>
      </div>
    );
  }
});

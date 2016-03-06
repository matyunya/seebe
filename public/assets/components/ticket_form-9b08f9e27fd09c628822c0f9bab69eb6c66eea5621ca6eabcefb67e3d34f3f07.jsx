var TicketForm = React.createClass({
  propTypes: {
    sections: React.PropTypes.array,
    tickets: React.PropTypes.array,
    prices: React.PropTypes.array,
    row_prices: React.PropTypes.array
  },
  render: function() {
    var style = {
      textAlign: 'center',
      lineHeight: '18px',
      minWidth: '300px',
      maxWidth: '400px'
    }
    return (
      <div className="test" style={style}>
        {this.props.sections.map(function(section) {
            return <Section section={section} key={section.id} tickets={this.props.tickets} prices={this.props.prices} row_prices={this.props.row_prices} />;
          }.bind(this))}
      </div>
      )
  }
});
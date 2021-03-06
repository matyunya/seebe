var TicketForm = React.createClass({
  propTypes: {
    sections: React.PropTypes.array,
    tickets: React.PropTypes.array,
    prices: React.PropTypes.array,
    row_prices: React.PropTypes.array
  },

  selected: function() {
    return typeof this.props.setSelected === 'function' ? this.props.setSelected : {};
  },

  render: function() {
    var style = {
      textAlign: 'center',
      lineHeight: '14px',
      minWidth: '300px',
      maxWidth: '1100px',
      fontSize: '11px'
    }
    return (
      <div className="test" style={style}>
        {this.props.sections.map(function(section) {
            return <Section section={section}
                      key={section.id}
                      tickets={this.props.tickets}
                      prices={this.props.prices}
                      row_prices={this.props.row_prices}
                      setSelected={this.selected()}
                    />;
          }.bind(this))}
      </div>
      )
  }
});
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

  getInitialState: function() {
    return {
      tooltip: false,
      style: {
        cursor: 'pointer',
        padding: 2,
        verticalAlign: 'middle',
        fontSize: 13
      },
      row: 0,
      seat: 0,
      price: 0,
      taken: false,
    }
  },

  showTooltip: function(row, seat, price, taken, e) {
      this.setState({
        style: {
          cursor: 'pointer',
          padding: 2,
          opacity: 1,
          fontSize: this.state.style.fontSize + 20,
          verticalAlign: 'middle'
        },
        row: row,
        seat: seat,
        price: price,
        taken: taken,
        tooltip: true,
        x: e.clientX,
        y: e.clientY
      });
  },

  hideTooltip: function(e) {
    this.setState({
      style: {
        cursor: 'pointer',
        padding: 2,
        fontSize: this.state.style.fontSize - 20,
        verticalAlign: 'middle'
      },
      tooltip: false
    });
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
                      showTooltip={this.showTooltip}
                      hideTooltip={this.hideTooltip}
                      tickets={this.props.tickets}
                      prices={this.props.prices}
                      row_prices={this.props.row_prices}
                      setSelected={this.selected()}
                    />;
          }.bind(this))}
        <Tooltip
          seat={this.state.seat}
          row={this.state.row}
          show={this.state.tooltip}
          price={this.state.price}
          taken={this.state.taken}
          x={this.state.x}
          y={this.state.y}
        />
      </div>
      )
  }
});
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

var Section = React.createClass({
  propTypes: {
    section: React.PropTypes.object,
    tickets: React.PropTypes.array,
    prices: React.PropTypes.array,
    row_prices: React.PropTypes.array
  },

  getInitialState: function() {
     return {
        section: this.props.section
     }
  },

  getRowPrices: function(row_id) {
    var prices = this.props.row_prices.filter(function(row_prices) {
      return row_prices.row_id === row_id;
    }.bind(row_id));

    if (prices.length > 0) {
      return prices[0].prices;
    }
  },

  render: function() {
    var nameStyle = {
      padding: '2px',
      backgroundColor: '#C0C0C0',
      color: 'white',
      fontSize: '12px',
      marginBottom: '3px'
    };

    var sectionStyle = {
      marginBottom: '15px'
    };

    return <span>
            <div style={sectionStyle}>
            {this.props.section.rows.map(function(row) {
              return <Row row={row}
                          key={row.id}
                          tickets={this.props.tickets}
                          prices={this.props.prices}
                          sectionName={this.props.section.name}
                          sectionId={this.props.section.id}
                          row_prices={this.getRowPrices(row.id)}
                      />;
            }.bind(this))}
            </div>
           </span>;
  }
});

var Row = React.createClass({
  propTypes: {
    row: React.PropTypes.object,
    tickets: React.PropTypes.array,
    prices: React.PropTypes.array,
    sectionName: React.PropTypes.string,
    row_prices: React.PropTypes.array
  },

  colors: [
    '#BF0B0B',
    '#DE3A3A',
    '#FF763B',
    '#D14D00',
    '#852034',
    '#D0B709',
    '#E3CF7F',
    '#647349',
    '#7A8650',
    '#345E1A',
    '#11C9C0',
    '#B7BCB1',
    '#121610'
],

  taken: function(row, seat) {
    seat = this.props.tickets.filter(function(id, ticket) {
      return (ticket[0] == row && ticket[1] == seat);
    }.bind(row, seat));

    return seat.length > 0;
  },

  getColor: function(row, seat) {
    var price = this.props.row_prices ? this.props.row_prices[seat-1] : this.props.row.prices[seat-1];
    return this.colors[price];
  },

  getPrice: function(seat) {
    if (this.props.row_prices) {
      return this.props.prices[this.props.row_prices[seat-1]];
    } else {
      return this.props.prices[this.props.row.prices[seat-1]];  
    }
    
  },

  seats: function() {
    var seats = [];
    for (var i=1; i < this.props.row.seats + 1; i++) {
      var seat = i;
      var color = this.taken(this.props.row.number, i) ? '#E0E0E0' : this.getColor(this.props.row.number, i);
        seats.push(
          <Seat 
            key={i}
            seat={i}
            row={this.props.row.number}
            color={color}
            taken={this.taken(this.props.row.number, i)}
            seat={i}
            price={this.getPrice(i)}
            sectionName={this.props.sectionName}
            sectionId={this.props.sectionId}
          />
          );
      }

    return seats;
  },

  render: function() {
    return <div><small>{this.props.row.number}</small> 
      {this.seats()}
       <small>{this.props.row.number}</small>
    </div>;
  }
});

var Seat = React.createClass({
  propTypes: {
    tickets: React.PropTypes.array,
    color: React.PropTypes.string,
    taken: React.PropTypes.bool,
    sectionName: React.PropTypes.string,
  },

  showTooltip: function(e) {
      this.setState({
        style: {
          cursor: "pointer",
          color: "white",
          backgroundColor: this.props.color,
          padding: '2px',
          fontSize: this.state.style.fontSize
        },
        tooltip: true,
        x: e.clientX,
        y: e.clientY
      });
  },

  hideTooltip: function(e) {
    this.setState({
      style: {
        color: this.props.color,
        cursor: "pointer",
        padding: '2px',
        fontSize: this.state.style.fontSize
      },
      tooltip: false
    });
  },

  getInitialState: function() {
    return {
      style: {
        color: this.props.color,
        cursor: "pointer",
        padding: '2px'
      },
      tooltip: false,
      selected: false
    }
  },

  select: function() {
    if (this.props.taken) {
      return false;
    }

    if (this.state.selected) {
      this.setState({
        style: {
          color: this.props.color,
          cursor: "pointer",
          padding: '2px'
        },
        tooltip: false,
        selected: false
      });
      return;
    }

    this.setState({
      style: {
        color: this.props.color,
        cursor: "pointer",
        padding: '2px',
        fontSize: '22px',
        fontWeight: '700'
      },
      tooltip: false,
      selected: true
    });
  },

  render: function() {
    return <span style={this.state.style} onMouseOver={this.showTooltip} onMouseOut={this.hideTooltip} onClick={this.select}>
      <Tooltip
       sectionName={this.props.sectionName}
       sectionId={this.props.sectionId}
       seat={this.props.seat}
       row={this.props.row}
       show={this.state.tooltip}
       price={this.props.price}
       taken={this.props.taken}
       x={this.state.x}
       y={this.state.y}
     />
      <Inputs selected={this.state.selected} row={this.props.row} seat={this.props.seat} sectionId={this.props.sectionId} />
      {this.props.seat}
      </span>;
  }
});

var Inputs = React.createClass({
  getInitialState: function() {
     return {
        selected: false
     }
  },

  getInputs: function() {
    return (
        <span>
        <input type="hidden" value={this.props.row} name="ticket[row]" />
        <input type="hidden" value={this.props.seat} name="ticket[seat]" />
        <input type="hidden" value={this.props.sectionId} name="ticket[section_id]" />
        </span>
        )
  },

  render: function() {
    return <span>
            {this.props.selected ? this.getInputs() : null}
           </span>
  }
});

var Tooltip = React.createClass({
  propTypes: {
    show: React.PropTypes.bool
  },

  text: function() {
    var text = this.props.price + ' руб.';

    return this.props.taken ? 'Билет продан' : text;
  },

  render: function() {
    var style = {
      padding: this.props.show ? '10px' : '0px',
      fontSize: '16px',
      position: 'fixed',
      left: this.props.x + 20,
      top: this.props.y - 20,
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.4)'
    };

    return <span style={style}>{this.props.show ? this.text() : null}</span>;
  }
});
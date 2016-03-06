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
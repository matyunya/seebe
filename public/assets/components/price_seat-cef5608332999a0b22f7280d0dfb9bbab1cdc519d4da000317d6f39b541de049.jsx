var PriceSeat = React.createClass({
  propTypes: {
    tickets: React.PropTypes.array,
    color: React.PropTypes.string,
    sectionName: React.PropTypes.string,
  },

  getColor: function() {
    return this.props.price > 0 ? 'green' : 'black';
  },

  showTooltip: function(e) {
      this.setState({
        style: {
          cursor: "pointer",
          color: "grey",
          backgroundColor: '#D0D0D0',
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
        color: this.getColor(),
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
        color: this.getColor(),
        cursor: "pointer",
        padding: '2px'
      },
      tooltip: false,
      selected: this.props.selected
    }
  },

  select: function() {
    this.props.passSeatRow(this.props.rowId, this.props.seat);

    if (this.state.selected) {
      this.setState({
        style: {
          color: this.getColor(),
          cursor: "pointer",
          padding: '2px',
        },
        tooltip: false,
        selected: false
      });
      return;
    }

    this.setState({
      style: {
        color: this.getColor(),
        cursor: "pointer",
        padding: '2px',
        fontSize: '22px',
        fontWeight: '700',
        paddingBottom: '10px',
        paddingTop: '10px'
      },
      tooltip: false,
      selected: true
    });
  },

  componentWillReceiveProps: function(props) {
    if (props.selected !== this.props.selected) {
      this.select();  
    }
  },

  componentDidUpdate: function(props) {
    if (props.price !== this.props.price) {
      this.select();
    }
  },

  render: function() {
    return <span style={this.state.style} onMouseOver={this.showTooltip} onMouseOut={this.hideTooltip} onClick={this.select}>
      <PriceTooltip
       sectionName={this.props.sectionName}
       sectionId={this.props.sectionId}
       seat={this.props.seat}
       row={this.props.row}
       selected={this.props.selected}
       show={this.state.tooltip}
       price={this.props.price}
       x={this.state.x}
       y={this.state.y}
     />
      <PriceInputs row={this.props.row} seat={this.props.seat} sectionId={this.props.sectionId} price={this.props.price} selected={this.props.selected} />
      {this.props.seat}
      </span>;
  }
});
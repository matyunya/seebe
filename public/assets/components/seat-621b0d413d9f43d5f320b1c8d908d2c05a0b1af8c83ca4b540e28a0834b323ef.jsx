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
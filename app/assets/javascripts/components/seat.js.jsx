var Seat = React.createClass({
  propTypes: {
    tickets: React.PropTypes.array,
    color: React.PropTypes.string,
    taken: React.PropTypes.bool,
    sectionName: React.PropTypes.string,
  },

    //TODO: отсортировать цвета по цене
  colors: [
    '#771155',
    '#AA4488',
    '#CC99BB',
    '#114477',
    '#4477AA',
    '#77AADD',
    '#117777',
    '#44AAAA',
    '#77CCCC',
    '#117744',
    '#44AA77',
    '#88CCAA',
    '#777711',
    '#AAAA44',
    '#DDDD77',
    '#774411',
    '#AA7744',
    '#DDAA77',
    '#771122',
    '#AA4455',
    '#DD7788'
  ],

  getColor: function() {
    if (this.props.taken) {
      return '#D0D0D0';
    }

    if (this.props.price < 100) {
      return 'black';
    }

    return this.colors[Math.round(this.props.price/100)];
  },

  showTooltip: function(e) {
      this.setState({
        style: {
          cursor: 'pointer',
          color: '#D0D0D0',
          backgroundColor: this.getColor(),
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
        cursor: 'pointer',
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
        cursor: 'pointer',
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

    this.props.setSelected(this.props.rowId, this.props.seat);

    if (this.state.selected) {
      this.setState({
        style: {
          color: this.getColor(),
          cursor: 'pointer',
          padding: '2px'
        },
        tooltip: false,
        selected: false
      });
      return;
    }

    this.setState({
      style: {
        color: this.getColor(),
        cursor: 'pointer',
        padding: '2px',
        fontSize: '22px',
        fontWeight: '700'
      },
      tooltip: false,
      selected: true
    });
  },

  componentDidUpdate: function(props) {
    if (this.props.selected !== props.selected) {
      this.select();
    }

    if (this.props.price !== props.price) {
      this.select();
      this.setState({selected: false, style: {fontSize: '16px', cursor: 'pointer', padding: '2px', color: this.getColor()}});
    }
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
      <Inputs selected={this.state.selected} row={this.props.row} seat={this.props.seat} rowId={this.props.rowId} sectionId={this.props.sectionId} />
      {this.props.seat}
      </span>;
  }
});
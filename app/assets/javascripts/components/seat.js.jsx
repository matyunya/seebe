var Seat = React.createClass({
  propTypes: {
    tickets: React.PropTypes.array,
    color: React.PropTypes.string,
    taken: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    sectionName: React.PropTypes.string,
  },

    //TODO: отсортировать цвета по цене
  colors: [
    'AliceBlue',
      'Aqua',
      'Aquamarine',
      'Azure',
      'Beige',
      'Bisque',
      'Black',
      'BlanchedAlmond',
      'Blue',
      'BlueViolet',
      'Brown',
      'BurlyWood',
      'CadetBlue',
      'Chartreuse',
      'Chocolate',
      'Coral',
      'CornflowerBlue',
      'Cornsilk',
      'Crimson',
      'Cyan',
      'DeepPink',
      'DeepSkyBlue',
      'DodgerBlue',
      'FireBrick',
      'ForestGreen',
      'Fuchsia',
      'Gold',
      'Goldenrod',
      'Green',
      'GreenYellow',
      'HotPink',
      'IndianRed',
      'Indigo',
      'Khaki',
      'Lavender',
      'LawnGreen',
      'LightBlue',
      'LightCoral',
      'LightCyan',
      'LightGoldenRodYellow',
      'LightGreen',
      'LightPink',
      'LightSalmon',
      'LightSeaGreen',
      'LightSkyBlue',
      'LightSteelBlue',
      'LightYellow',
      'Lime',
      'LimeGreen',
      'Linen',
      'Magenta',
      'Maroon',
      'MediumAquaMarine',
      'MediumBlue',
      'MediumOrchid',
      'MediumPurple',
      'MediumSeaGreen',
      'MediumSlateBlue',
      'MediumSpringGreen',
      'MediumTurquoise',
      'MediumVioletRed',
      'MidnightBlue',
      'MintCream',
      'MistyRose',
      'Moccasin',
      'Navy',
      'OldLace',
      'Olive',
      'OliveDrab',
      'Orange',
      'OrangeRed',
      'Orchid',
      'PapayaWhip',
      'PeachPuff',
      'Peru',
      'Pink',
      'Plum',
      'PowderBlue',
      'Purple',
      'Red',
      'RosyBrown',
      'RoyalBlue',
      'SaddleBrown',
      'Salmon',
      'SandyBrown',
      'SeaGreen',
      'SeaShell',
      'Sienna',
      'Silver',
      'SkyBlue',
      'SlateBlue',
      'Snow',
      'SpringGreen',
      'SteelBlue',
      'Tan',
      'Teal',
      'Thistle',
      'Tomato',
      'Turquoise',
      'Violet',
      'Wheat',
      'Yellow',
      'YellowGreen'
  ],

  getColor: function() {
    if (this.props.taken || !this.props.price) {
      return '#D0D0D0';
    }

    if (this.props.price < 100) {
      return 'black';
    }

    return this.colors[Math.round(this.props.price/100)];
  },

  getInitialState: function() {
    return {
      style: {
        color: this.getColor(),
        cursor: 'pointer',
        padding: 2,
        verticalAlign: 'middle',
        fontSize: 13
      },
      tooltip: false,
      selected: false
    }
  },

  select: function() {
    if (this.props.taken) {
      return false;
    }

    if (typeof this.props.setSelected === 'function') {
      this.props.setSelected(this.props.rowId, this.props.seat);  
    }

    if (this.state.selected) {
      this.setState({
        style: {
          color: this.getColor(),
          cursor: 'pointer',
          verticalAlign: 'middle',
          padding: 2
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
        padding: 2,
        fontSize: 25,
        verticalAlign: 'middle'
      },
      tooltip: false,
      selected: true
    });
  },

  showTooltip: function(e) {
    if (this.props.price && !this.props.taken) {
      return this.props.showTooltip(this.props.row, this.props.seat, this.props.price, this.props.taken, e);  
    }
  },

  componentDidUpdate: function(props) {
    if (this.props.selected !== props.selected) {
      this.select();
    }

    if (this.props.price !== props.price) {
      this.select();
      this.setState({selected: false, style: {fontSize: '16', cursor: 'pointer', padding: 2, color: this.getColor()}});
    }
  },

  render: function() {
    return <span
          style={this.state.style}
          onMouseOver={this.showTooltip}
          onMouseOut={this.props.hideTooltip}
          onClick={this.select}>

      <Inputs
        selected={this.state.selected}
        row={this.props.row}
        seat={this.props.seat}
        rowId={this.props.rowId}
        sectionId={this.props.sectionId}
      />
      &#9679;
      </span>;
  }
});
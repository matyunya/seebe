var Tooltip = React.createClass({
  propTypes: {
    show: React.PropTypes.bool
  },

  getInitialState: function() {
     return {
        show: false
     }
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
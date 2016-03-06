var PriceInputs = React.createClass({
  getInitialState: function() {
     return {
        selected: false
     }
  },

  getName: function() {
    return "prices[" + this.props.sectionId + "][" + this.props.row + "][" + this.props.seat + "]";
  },

  getInputs: function() {
    return (
        <span>
        <input type="hidden" value={this.props.price} name={this.getName()} id={this.props.selected} />
        </span>
        )
  },

  render: function() {
    return <span>
            {this.getInputs()}
           </span>
  }
});
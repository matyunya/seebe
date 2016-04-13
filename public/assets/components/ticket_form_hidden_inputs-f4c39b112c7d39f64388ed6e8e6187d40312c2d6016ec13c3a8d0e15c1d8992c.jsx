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
        <input type="hidden" value={this.props.rowId} name="ticket[row_id]" />
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
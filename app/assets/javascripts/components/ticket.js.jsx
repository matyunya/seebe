var Ticket = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    published: React.PropTypes.bool
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return (
      nextProps.title !== this.props.title ||
      nextProps.body !== this.props.body ||
      nextState.published !== this.state.published
    );
  },

  render: function() {
    return (
      <div>
        <div>Title: {this.props.title}</div>
        <div>Body: {this.props.body}</div>
        <div>Published: {this.props.published}</div>
      </div>
    );
  }
});

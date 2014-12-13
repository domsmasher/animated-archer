/** @jsx React.DOM */

var React = require('react'),
FeedItem = require('./FeedItem');

var FeedList = React.createClass({

  render: function() {

    var feedItems = this.props.items.map(function(item) {
      return <FeedItem
          key={item.key}
          title={item.title}
          desc={item.description}
          onVote={this.props.onVote}
          voteCount={item.voteCount} />
    }.bind(this));

    return (
      <ul className="list-group container">
      {feedItems}
      </ul>
    );
  }

});

module.exports = FeedList;

/** @jsx React.DOM */

var React         = require('react');
var ShowAddButton = require('./ShowAddButton');
var FeedForm      = require('./FeedForm');
var FeedList      = require('./FeedList');
var _             = require('lodash');
var Firebase      = require('firebase');

var Feed = React.createClass({

  loadData: function () {
      var ref = new Firebase('https://radiant-torch-3232.firebaseio.com/feed');

      ref.on('value', function (snapshot) {

        var items = [];
        snapshot.forEach(function (item) {
          var itm = item.val();
          itm.key = item.key();
          items.push(itm);
        });

        sorted = _.sortBy(items, function(item) {
          return -item.voteCount;
        });

        this.setState({
          items: sorted
        });
      }.bind(this));
  },

  componentDidMount: function () {
      this.loadData();
  },

  getInitialState: function() {
    return {
      items: [],
      formDisplayed: false
    }
  },

  onNewItem: function (newItem) {
    var ref = new Firebase('https://radiant-torch-3232.firebaseio.com/feed');

    ref.push(newItem);
  },

  onToggleForm: function () {
      this.setState({
        formDisplayed: !this.state.formDisplayed
      });
  },

  onVote: function (item) {
    var ref = new Firebase('https://radiant-torch-3232.firebaseio.com/feed').child(item.key);
    ref.update(item);
  },

  render: function() {
    return (
      <div>

      <div className="container">
      <ShowAddButton displayed={this.state.formDisplayed} onToggleForm={this.onToggleForm} />
      </div>

      <FeedForm displayed={this.state.formDisplayed} onNewItem={this.onNewItem} />

      <br />
      <br />

      <FeedList items={this.state.items} onVote={this.onVote} />

      </div>
    );
  }

});

module.exports = Feed;

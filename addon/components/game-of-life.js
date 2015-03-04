import Ember from 'ember';
import Creator from '../lib/creator';

// {{  game-of-life 
// 	options=gameOfLifeOptions
// }}

// this takes an options object with these properties
// {
// 	maxRand: 10,
// 	seedCount: 100
// }

// need to include in options
// 1.  cellRadius
// 2.  cellColor

export default Ember.Component.extend({
	classNames: ['stage'],

  defaultOptions: {
    maxRand: 10,
    seedCount: 100
  },

  seeds: function () {
    var options = $.extend(this.get('defaultOptions'), this.get('options'));
  	return this.seed(options.seedCount);
  }.property('options.seedCount', 'options.maxRand'),

  didInsertElement: function() {
	var creator = new Creator(this.get('seeds'));
	creator.letThereBeLight();
  },

  seed: function (count) {
    var cells = [];
    while (1 <= count) {
      cells.push([this.randomNum(), this.randomNum()]);
      count = count - 1;
    }
    return cells;
  },

  randomNum: function () {
    var options = $.extend(this.get('defaultOptions'), this.get('options'));
    var n = Math.floor((Math.random() * options.maxRand) + 1);
    if (Math.random() <= 0.5) { n = n * -1; } // make n negative ~half the time
    return n;
  }

});

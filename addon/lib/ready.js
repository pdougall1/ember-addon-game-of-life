$( document ).ready(function() {

  var options = {
    maxRand: 10,
    seedCount: 100
  }

  this.toHTML = function (seeds) {
    return seeds.map( function (arr) {
      return "[" + arr.toString() + "]"
    }).join(", ");
  }

  this.seed = function (count) {
    cells = []
    while (1 <= count) {
      cells.push([this.randomNum(), this.randomNum()])
      count = count - 1
    }
    return cells
  }

  this.randomNum = function () {
    var n = Math.floor((Math.random() * options.maxRand) + 1)
    if (Math.random() <= 0.5) { n = n * -1 } // make n negative ~half the time
    return n
  }

  options.seeds = this.seed(options.seedCount);
  options.htmlSeed = this.toHTML(options.seeds);
  $('#seed-array').html(options.htmlSeed);

  var creator = new Creator(options.seeds);
  creator.letThereBeLight();
  $('body').on('click', function () {
    creator.next();
  });
});

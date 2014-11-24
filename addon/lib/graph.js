var getValues = function (obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
}

function Graph (seed) {
  this.parentGeneration = seed

  var stageWidth = $(window).width()
  var stageHeight = $(window).height()
  var centerX = stageWidth / 2;
  var centerY = stageHeight / 2;
  var cellRadius = 10;

  var stage = d3.select('.stage').append('svg')
    .attr('width', stageWidth)
    .attr('height', stageHeight)
    .style('background', 'white');

  this.cull = function (survivingCells) {
    var actors = stage.selectAll('circle')
      .data(survivingCells)

    actors.exit()
      .remove();
  }

  this.breed = function (cells) {
    var actors = stage.selectAll('circle')
      .data(cells)

    actors.enter().append('circle')
      .attr('class', 'cell')
      .attr('r', cellRadius)
      .attr('cx', function (d) { return centerX + (d.x * (cellRadius * 2)) })
      .attr('cy', function (d) { return centerY + (d.y * (cellRadius * 2)) })
      .style('fill', '#E5E5E5');
  }

  this.findSurvivingCells = function (cells) {
    var parentKeys = Object.keys(this.parentGeneration)
    var cellsKeys  = Object.keys(cells);
    var survivors = this.parentGeneration
    parentKeys.forEach( function (pKey) {
      if (cellsKeys.indexOf(pKey) == -1) {
        delete survivors[pKey]
      }
    });
    return survivors
  }

  this.tick = function (cells) {
    var survivors = this.findSurvivingCells(cells)
    this.cull(getValues(survivors));
    this.breed(getValues(cells));
    this.parentGeneration = survivors
  }

}

export default Graph;
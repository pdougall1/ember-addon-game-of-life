// import Universe from './universe';
import Colony from './colony';
import Graph from './graph';
import Cell from './cell';

function Creator (seedArr) {
  this.colony = new Colony;
  this.graph = new Graph(this.colony.agar);
  this.seedCells = (function () {
    return seedArr.map( function (arr) {
      return new Cell(arr[0], arr[1]);
    });
  })();

  this.letThereBeLight = function () {
    var _this = this
    this.colony.seedMe(this.seedCells);
    var recurse = function () {
      _this.graph.tick(_this.colony.liveCells);
      _this.colony = _this.tick(_this.colony);
      setTimeout(function () {
        recurse();
      }, 1000);
    }
    recurse();
  }

  this.next = function () {
    this.graph.tick(this.colony.liveCells);
    this.colony = this.tick(this.colony);
  }

  this.tick = function (colony) {
    colony.agar = colony.moveThroughTheGeneration();
    return colony
  }

}

export default Creator;
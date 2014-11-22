import Universe from './universe';
import Colony from './colony';
import Graph from './graph';
import Cell from './cell';

function Creator (seedArr) {
  this.universe = new Universe;
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
      _this.graph.tick(_this.colony.agar);
      _this.colony = _this.universe.tick(_this.colony);
      setTimeout(function () {
        recurse();
      }, 100);
    }
    recurse();
  }

  this.next = function () {
    this.graph.tick(this.colony.agar);
    this.colony = this.universe.tick(this.colony);
  }
}

export default Creator;

import Cell from './cell';

function Colony () {


  // * the agar will know about all live cells and their neighbors
  // * on each tick the universe will go through all cells in the 
  //   agar (alive and dead) and a new state of each will be added
  //   to a new agar
  //     - it is important to make a new agar so changes don't affect 
  //       the old state as the new state is being created
  // * if a cell does not have any live neighbors it should be deleted
  // * afterwards the new agar will replace the old agar
  // * at the end of the tick all live cells will be collected by 
  //   the universe and passed into the next tick of the graph
  this.agar = {};
  this.liveCells = {};

  this.allIds = function () {
    return Object.keys(this.agar);
  }

  this.seedMe = function (seed) {
    var colony = this
    var agar = {}
    seed.forEach( function (cell) {
      cell.updateNeighboringCells(agar);
      cell.currentStatus = 1;
      agar[cell.id] = cell
    });

    Object.keys(agar).forEach(function (id) {
      agar = colony.addNeighborsToAgarIfNew(agar[id].neighboringCells, agar);
    });

    this.agar = agar;
  };

  this.moveThroughTheGeneration = function () {
    var cell;
    var _this = this;
    var thisGen = this.agar;
    var nextGen = {};
    this.liveCells = {};

    Object.keys(thisGen).forEach(function (id) {
      var oldCell = thisGen[id];
      
      var newCell = new Cell(oldCell.x, oldCell.y);
      newCell.currentStatus = oldCell.currentStatus
      newCell.update(thisGen);
      
      nextGen[id] = newCell;
      if (newCell.currentStatus === 1) {
        _this.liveCells[newCell.id] = newCell;
      }

      if (newCell.neighboringCellsCount > 1) {
        nextGen = _this.addNeighborsToAgarIfNew(newCell.neighboringCells, nextGen);        
      }
    });
    console.log(nextGen)
    return nextGen;
  };

  this.addNeighborsToAgarIfNew = function (neighbors, nextGen) {
    Object.keys(neighbors).forEach( function (id) {
      if (!nextGen[id]) {
        nextGen[id] = neighbors[id];  
      }
    });

    return nextGen;
  };

}

export default Colony;
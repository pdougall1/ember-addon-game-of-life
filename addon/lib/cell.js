function Cell (x, y) {

  // STATUSES
  // 0 == dead
  // 1 == alive

  this.x = x;
  this.y = y;

  this.id = (function () { return x + ':' + y })();
  this.neighboringCells = {};
  this.neighboringCellsCount = 0
  this.currentStatus = 0
  this.hasAtLeastOneLiveNeighbor = false;

  this.update = function (agar) {
    this.updateNeighboringCells(agar);
    this.updateCurrentStatus();
  };


  // PRIVATE

  this.updateNeighboringCells = function (agar) {
    var i, j, key, cell;
    for (i = this.x - 1; i <= this.x + 1; i++) {
      for (j = this.y - 1; j <= this.y + 1; j++) {
        key = i+':'+j;

        if (cell = agar[key]) {
          cell = cell
        } else {
          cell = new Cell(i, j);
        }

        this.neighboringCells[key] = cell
      }
    }
  };

  this.updateCurrentStatus = function () {
    var total = 0;
    var neighbors = this.neighboringCells;
    
    Object.keys(neighbors).forEach(function (key) {
      total = total + neighbors[key].currentStatus;
    });
    this.neighboringCellsCount = total;
    
    if (total === 3 || (total === 4 && this.currentStatus === 1)) {
      this.currentStatus = 1;
    } else {
      this.currentStatus = 0;
    }

    if (total > 0) { this.hasAtLeastOneLiveNeighbor = true }

  };

}

export default Cell;
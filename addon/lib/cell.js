function Cell (x, y) {
  this.x = x
  this.y = y

  this.id = (function () { return x + ':' + y })()

  this.block = function () {
    var cells = []
    var i
    var j
    for (i = this.x - 1; i <= this.x + 1; i++) {
      for (j = this.y - 1; j <= this.y + 1; j++) {
        cells.push(new Cell(i, j));
      }
    }
    return cells
  }
}

export default Cell;

function Colony () {

  this.agar = {}

  this.allIds = function () {
    return Object.keys(this.agar);
  }

  this.seedMe = function (seed) {
    var colony = this
    colony.agar = {}
    seed.forEach( function (cell) {
      colony.agar[cell.id] = cell
    });
  }

  this.countLiveNeighbors = function (cell) {
    var ids = this.allIds()
    var count = 0

    cell.block().forEach( function (neighbor) {
      var isAlive = ids.indexOf(neighbor.id) != -1;
      var isNotSelf = (cell.id != neighbor.id);
      if (isAlive && isNotSelf) {
        count = count + 1;
      }
    });
    return count;
  }

  this.findSurvivors = function () {
    var colony = this;
    var ids = Object.keys(colony.agar);
    var survive = []
    ids.forEach(function (id) {
      var cell = colony.agar[id];
      var neighborCount = colony.countLiveNeighbors(cell);
      if (neighborCount >= 2 && neighborCount <= 3) {
        survive.push(colony.agar[id]);
      }
    });
    return survive;
  }

  this.reproduce = function () {
    var colony = this;
    var ids = Object.keys(this.agar);
    var babies = []
    ids.forEach(function (id) {
      colony.agar[id].block().forEach(function (c) {

        var isNotAlreadyAlive = ids.indexOf(c.id) == -1;
        var hasThreeNeighbors = colony.countLiveNeighbors(c) == 3;
        var isNotAlreadyBorn  = babies.map(function (b) {return b.id}).indexOf(c.id) == -1

        if (hasThreeNeighbors && isNotAlreadyAlive && isNotAlreadyBorn) {
          babies.push(c);
        }
      });
    });
    return babies
  }
}

export default Colony;

import Colony from './colony';

function Universe () {
  this.tick = function (colony) {
    var survive = colony.findSurvivors();
    var babies  = colony.reproduce();
    var newColony = new Colony
    newColony.seedMe(survive.concat(babies));
    return newColony
  }
}

export default Universe;

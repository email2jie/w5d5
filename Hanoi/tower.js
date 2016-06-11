function Hanoi(){
  this.stacks = [[3,2,1],[],[]];
}

Hanoi.prototype.run = function (reader, completionCallback) {
  this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
    if (!this.move(startTowerIdx, endTowerIdx)) {
      console.log("Invalid Move!");
    }
    if (!this.isWon()) {
      this.run(completionCallback);
    }else{
      completionCallback();
    }

  });
};

Hanoi.prototype.move = function (startTowerIdx, endTowerIdx) {
  const startStack = this.stacks[startTowerIdx];
  const endStack = this.stacks[endTowerIdx];
  let valid = this.isValidMove(startTowerIdx, endTowerIdx);
  if (valid) {
    endStack.push(startStack.pop());
    return true;
  }
  return false;
};

Hanoi.prototype.isWon = function () {
  return (this.stacks[1].length === 3 || this.stacks[2].length === 3);
};

Hanoi.prototype.promptMove = function (reader, callback) {
  this.print();
  reader.question("Make a move: ", function(answer){
    let startTowerIdx = answer.slice(0,1);
    let endTowerIdx = answer.slice(3);
    callback(startTowerIdx, endTowerIdx);
  });
};

Hanoi.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  const startStack = this.stacks[startTowerIdx];
  const endStack = this.stacks[endTowerIdx];
  if(startStack.length !== 0){
    if(endStack.length === 0){
      return true;
    }else if (startStack[startStack.length-1] < endStack[endStack.length-1]) {
        return true;
    }
  }
  return false;
};

Hanoi.prototype.print = function () {
  console.log(JSON.stringify(this.stacks));
};

module.exports = Hanoi;

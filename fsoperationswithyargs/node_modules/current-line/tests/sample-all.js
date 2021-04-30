const currentLine = require(".."); //require("current-line")
const log = (o) => console.log(JSON.stringify(o, null, 2));

function goC(params) {
  log(currentLine.all());
}

class ClassA {
  static goB() {
    goC();
  }
}

function goA(params) {
  ClassA.goB();
}

log(goA());

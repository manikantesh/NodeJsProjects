const currentLine = require(".."); //require("current-line")
const log = (o) => console.log(JSON.stringify(o, null, 2));

log(currentLine.get());

function funcA() {
  let funcB = () => {
    log(currentLine.get());
    log(currentLine.get(1));
  };
  funcB();
}
funcA();

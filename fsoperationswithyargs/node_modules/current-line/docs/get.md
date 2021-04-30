## tests/sample-get.js

```js
const currentLine = require("./.."); //require("current-line")
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
```

Output:

```json
{
  "method": null,
  "line": 4,
  "file": "/home/user/current-line/tests/sample.js",
  "filename": "sample"
}
{
  "method": "funcB",
  "line": 8,
  "file": "/home/user/current-line/tests/sample.js",
  "filename": "sample"
}
{
  "method": "funcA",
  "line": 11,
  "file": "/home/user/current-line/tests/sample.js",
  "filename": "sample"
}
```

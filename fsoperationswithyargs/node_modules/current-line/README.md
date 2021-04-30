[![NPM version](https://img.shields.io/npm/v/current-line.svg)](https://www.npmjs.com/package/current-line)
[![npm](https://img.shields.io/npm/dt/current-line.svg)](https://github.com/flaviolsousa/current-line)
[![Build Status](https://travis-ci.org/flaviolsousa/current-line.svg?branch=master)](https://travis-ci.org/flaviolsousa/current-line)
[![codecov](https://codecov.io/gh/flaviolsousa/current-line/branch/master/graph/badge.svg)](https://codecov.io/gh/flaviolsousa/current-line)
[![dependencies Status](https://david-dm.org/flaviolsousa/current-line/status.svg)](https://david-dm.org/flaviolsousa/current-line)
[![Known Vulnerabilities](https://snyk.io/test/github/flaviolsousa/current-line/badge.svg)](https://snyk.io/test/github/flaviolsousa/current-line)

# current-line

Get current filename, function name and line number

## Simple to use

```js
const currentLine = require("current-line");

function go() {
  console.log(currentLine.get());
}

go();
```

Output:

```json
{
  "method": "go",
  "line": 4,
  "file": "/home/user/current-line/tests/sample.js",
  "filename": "sample"
}
```

---

## Documentation

_Last stack item_

```
currentLine.get() : <StackItem>
```

_Stack item by index_

```
currentLine.get(1) : <StackItem>
```

_All Stack item_

```
currentLine.all() : <StackItem[]>
```

#### Others documentations

[Full API](docs/api.md)

[Sample currentLine.get()](docs/get.md)

[Sample currentLine.all()](docs/all.md)

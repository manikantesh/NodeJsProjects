const assert = require("assert");
const currentLine = require("../..");

describe("index-test.js", function () {
  it("get", function (done) {
    const result = currentLine.get();
    assert.ok(result, "result: " + JSON.stringify(result));
    assert.ok(result.line === 6, "result: " + JSON.stringify(result));
    assert.ok(result.method === null, "result: " + JSON.stringify(result));
    assert.ok(result.file.endsWith("current-line/tests/mocha/index-test.js"), "result: " + JSON.stringify(result));
    assert.ok(result.filename === "index-test", "result: " + JSON.stringify(result));
    done();
  });

  it("method", function getMethod(done) {
    const result = currentLine.get();
    assert.ok(result, "result: " + JSON.stringify(result));
    assert.ok(result.method === "getMethod", "result: " + JSON.stringify(result));
    done();
  });

  it("level", function getMethod(done) {
    function subLevel(params) {
      const result = currentLine.get(1);
      assert.ok(result, "result: " + JSON.stringify(result));
      assert.ok(result.method === "getMethod", "result: " + JSON.stringify(result));
    }
    subLevel();
    done();
  });

  it("last-level", function getMethod(done) {
    function subLevel(params) {
      const result = currentLine.get(100);
      assert.ok(result, "result: " + JSON.stringify(result));
      assert.ok(result.line > 0, "result: " + JSON.stringify(result));
    }
    subLevel();
    done();
  });

  it("getAll", function getMethod(done) {
    const result = currentLine.all();
    // console.log(JSON.stringify(result, null, 2));
    assert.ok(result, "result: " + JSON.stringify(result));
    assert.ok(result.length > 0, "result: " + JSON.stringify(result));
    assert.ok(result[0].line > 0, "result: " + JSON.stringify(result));
    done();
  });
});

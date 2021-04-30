/*
# gen doc
npm i jsdoc-to-markdown -g
jsdoc2md index.js > docs/api.md
*/

/**
 * @typedef StackItem
 * @type {object}
 * @property {string} method - Name of function on stack
 * @property {number} line - Line number on stack
 * @property {string} file - /PathOfFile/Source/NameOfFilename.js
 * @property {string} filename - NameOfFile
 */

/**
 * @module currentLine
 * @example
 * const currentLine = require('current-line')
 */

/**
 * @alias module:currentLine
 * @typicalname currentLine
 */
class CurrentLine {
  /**
   * Returns a single item
   *
   * @param {number} [level] Useful to return levels up on the stack. If not informed, the first (0, zero index) element of the stack will be returned
   * @returns {StackItem}
   */
  get(level = 0) {
    const stack = getStack();
    const i = Math.min(level + 1, stack.length - 1);
    const item = stack[i];
    const result = parse(item);
    return result;
  }

  /**
   * Returns all stack
   *
   * @returns {StackItem[]}
   */
  all() {
    const stack = getStack();
    const result = [];
    for (let i = 1; i < stack.length; i++) {
      const item = stack[i];
      result.push(parse(item));
    }
    return result;
  }
}

function getStack() {
  const orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function (_, stack) {
    return stack;
  };
  const err = new Error();
  Error.captureStackTrace(err, arguments.callee);
  const stack = err.stack;
  Error.prepareStackTrace = orig;
  return stack;
}

function parse(item) {
  const result = {
    method: item.getFunctionName(),
    line: item.getLineNumber(),
    file: item.getFileName(),
  };
  result.filename = result.file.replace(/^.*\/|\\/gm, "").replace(/\.\w+$/gm, "");
  return result;
}

module.exports = new CurrentLine();

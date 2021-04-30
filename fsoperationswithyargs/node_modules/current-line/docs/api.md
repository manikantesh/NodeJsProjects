## Modules

<dl>
<dt><a href="#module_currentLine">currentLine</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#StackItem">StackItem</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="module_currentLine"></a>

## currentLine

**Example**

```js
const currentLine = require("current-line");
```

- [currentLine](#module_currentLine)
  - [CurrentLine](#exp_module_currentLine--CurrentLine) ⏏
    - [.get([level])](#module_currentLine--CurrentLine+get) ⇒ [<code>StackItem</code>](#StackItem)
    - [.all()](#module_currentLine--CurrentLine+all) ⇒ [<code>Array.&lt;StackItem&gt;</code>](#StackItem)

<a name="exp_module_currentLine--CurrentLine"></a>

### CurrentLine ⏏

**Kind**: Exported class  
<a name="module_currentLine--CurrentLine+get"></a>

#### currentLine.get([level]) ⇒ [<code>StackItem</code>](#StackItem)

Returns a single item

**Kind**: instance method of [<code>CurrentLine</code>](#exp_module_currentLine--CurrentLine)

| Param   | Type                | Default        | Description                                                                                                               |
| ------- | ------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [level] | <code>number</code> | <code>0</code> | Useful to return levels up on the stack. If not informed, the first (0, zero index) element of the stack will be returned |

<a name="module_currentLine--CurrentLine+all"></a>

#### currentLine.all() ⇒ [<code>Array.&lt;StackItem&gt;</code>](#StackItem)

Returns all stack

**Kind**: instance method of [<code>CurrentLine</code>](#exp_module_currentLine--CurrentLine)  
<a name="StackItem"></a>

## StackItem : <code>object</code>

**Kind**: global typedef  
**Properties**

| Name     | Type                | Description                          |
| -------- | ------------------- | ------------------------------------ |
| method   | <code>string</code> | Name of function on stack            |
| line     | <code>number</code> | Line number on stack                 |
| file     | <code>string</code> | /PathOfFile/Source/NameOfFilename.js |
| filename | <code>string</code> | NameOfFile                           |

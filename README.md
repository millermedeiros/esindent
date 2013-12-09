# esindent

ECMAScript code indenter based on Esprima AST

**work in progress**

---

## Why?

This project started as an experiment while trying to [decouple the indent
logic from the other token manipulations on
esformatter](https://github.com/millermedeiros/esformatter/issues/96). It's an
attempt at finding a simpler solution to the problem while still maintaining
the flexibility.

By building it as a separate tool it is also simpler to reuse it for other
projects and will make some of the tests simpler to write (since we can test
the indentation separately).


## How?

This tool uses a rocambole generated AST to traverse tokens inside each node
and add/remove indent based on the node type.

The algorithm is very straightforward, it simple loops through all nodes
(starting from the leaf) up to the program root, scanning each line start for
`WhiteSpace` and adding/removing/editing `Indent` tokens as needed.


## Goals

 - Indent based on syntax (not tokens).
 - Options to toggle behavior.
 - Be able to indent any JavaScript program!


## API

### esindent.transform(ast[, opts]):AST

Transforms AST in-place, adding `Indent` tokens at the beginning of each line
that needs indentation.

```js
var esi = require('esindent');
esi.transform(ast, {
  value: '  ',
  ArrayExpression: 1,
  BlockStatement: 1,
  ChainedMemberExpression: 1,
  MultipleVariableDeclaration: 1,
  ObjectExpression: 1,
  SwitchCase: 1,
  SwitchStatement: 1,
  EmptyStatement: 0
});

// to get the result as a string simply call ast.toString()
console.log( ast.toString() );
```


## License

Released under the MIT License


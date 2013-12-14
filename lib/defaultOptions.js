// default options

module.exports = {
  value: '  ',
  ArrayExpression: 1,
  ChainedMemberExpression: 1,
  ConditionalExpression: 1,
  MultipleVariableDeclaration: 1,
  ObjectExpression: 1,
  SwitchCase: 1,
  SwitchStatement: 1,
  EmptyStatement: 0,

  // Can't use BlockStatement because ForStatement and IfStatement body might
  // not have curly braces (so they aren't considered BlockStatement)
  // also not a good idea to use BlockStatement since it's too generic
  ForStatement: 1,
  ForInStatement: 1,
  IfStatement: 1,
  IfStatementConditional: 1,
  FunctionDeclaration: 1,
  FunctionExpression: 1,
  TryStatement: 1,
  CatchClause: 1,
  WhileStatement: 1,
  DoWhileStatement: 1,
  TopLevelFunctionBlock: 1
};


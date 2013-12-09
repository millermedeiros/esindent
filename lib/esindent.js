"use strict";


var rocambole = require('rocambole');


// ---


var DEFAULT_OPTIONS = {
  value: '  ',
  ArrayExpression: 1,
  DoWhileStatement: 1,
  ForStatement: 1,
  ForInStatement: 1,
  FunctionDeclaration: 1,
  FunctionExpression: 1,
  IfStatement: 1,
  ObjectExpression: 1,
  SwitchCase: 1,
  SwitchStatement: 1,
  TryStatement: 1,
  WhileStatement: 1,
  EmptyStatement: 0
};


// ---


var _opts = DEFAULT_OPTIONS;


// ---


// transform AST in place
exports.transform = function(ast, opts) {
  // TODO: merge with default options
  rocambole.moonwalk(ast, exports.transformNode);
  exports.sanitize(ast);
  return ast;
};



exports.transformNode = function(node) {
  if (DEFAULT_OPTIONS[node.type]) {
    indentNode(node);
  }
};


function indentNode(node){
  var token = node.startToken.next;
  var next;
  while (token && token !== node.endToken) {
    next = token.next;
    if (isBr(token.prev)) {
      if (isWs(token)) {
        remove(token);
      } else {
        indentBefore(token);
      }
    }
    token = next;
  }
}


function indentBefore(token){
 if (isIndent(token)) {
    token.value += _opts.value;
    token.level += 1;
  } else if (isWs(token)) {
    token.type = 'Indent';
    token.value = _opts.value;
    token.level = 1;
  } else {
    insertTokenBefore(token, {
      type: 'Indent',
      value: _opts.value,
      level: 1
    });
  }
}


function insertTokenBefore(target, newToken) {
  newToken.prev = target.prev;
  newToken.next = target;
  if (target.prev) {
    target.prev.next = newToken;
  } else if (target.root) {
    target.root.startToken = newToken;
  }
  target.prev = newToken;
}


exports.sanitize = function(ast) {
  var token = ast.startToken;
  while (token) {
    var next = token.next;
    if (isOriginalIndent(token)) {
      remove(token);
    }
    token = next;
  }
};


function isOriginalIndent(token) {
  // original indent don't have a "indentLevel" value
  // we also need to remove any indent that happens after a token that
  // isn't a line break (just in case
  return (token.type === 'WhiteSpace' && (!token.prev || isBr(token.prev)) && !isBr(token.next)) || (token.type === 'Indent' && (token.level == null || !isBr(token.prev)));
}


function isBr(token){
  return token && token.type === 'LineBreak';
}


function remove(target) {
  if (target.next) {
    target.next.prev = target.prev;
  } else if (target.root) {
    target.root.endToken = target.prev;
  }

  if (target.prev) {
    target.prev.next = target.next;
  } else if (target.root) {
    target.root.startToken = target.next;
  }
}


function isIndent(token){
  return token && token.type === 'Indent';
}


function isWs(token){
  return token && token.type === 'WhiteSpace';
}


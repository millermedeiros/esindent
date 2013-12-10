"use strict";


var rocambole = require('rocambole');
var rToken = require('rocambole-token');
var isBr = rToken.isBr;
var isWs = rToken.isWs;
var isIndent = rToken.isIndent;
var remove = rToken.remove;
var before = rToken.before;


// ---


var DEFAULT_OPTIONS = {
  value: '  ',
  ArrayExpression: 1,
  BlockStatement: 1,
  ChainedMemberExpression: 1,
  MultipleVariableDeclaration: 1,
  ObjectExpression: 1,
  SwitchCase: 1,
  SwitchStatement: 1,
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
  if (shouldIndentNode(node)) {
    indentInBetween(node.startToken.next, node.endToken);
    if (shouldIndentNodeType('ChainedMemberExpression') &&
        isChainedMemberExpressionArgument(node)) {
      indentInBetween(node.startToken.next, node.endToken.next);
    }
  }
};


function shouldIndentNode(node){
  return shouldIndentNodeType(node.type) ||
    (shouldIndentNodeType('ChainedMemberExpression') &&
    isTopChainedMemberExpression(node)) ||
    (shouldIndentNodeType('MultipleVariableDeclaration') &&
    isMultipleVariableDeclaration(node));
}


function shouldIndentNodeType(type) {
  return _opts[type];
}


function isMultipleVariableDeclaration(node){
  return node.type === 'VariableDeclaration' && node.declarations.length > 1;
}


function isTopChainedMemberExpression(node) {
  return node &&
    node.type === 'MemberExpression' &&
    node.parent.type === 'CallExpression' &&
    node.parent.callee.type === 'MemberExpression' &&
    node.parent.parent.type === 'ExpressionStatement';
}


function isChainedMemberExpressionArgument(node) {
  return isTopChainedMemberExpression(node.parent.callee) &&
    shouldIndentNodeType(node.type) &&
    // FIXME: this is error prone, "." might not be first token before
    // startToken, so correct would be to find line break in between startToken
    // and the first non-empty token before it
    isOnSeparateLine(node.parent.callee.property.startToken.prev);
}


function isOnSeparateLine(token) {
  return isBr(token.prev) || isBr(token.prev.prev);
}


function indentInBetween(startToken, endToken) {
  var token = startToken;
  var next;
  while (token && token !== endToken) {
    next = token.next;
    if (isBr(token.prev)) {
      if (isWs(token)) {
        remove(token);
      } else if (!isBr(token)) {
        indentBefore(token);
      }
    }
    token = next;
  }
}


function indentBefore(token) {
  if (isIndent(token)) {
    token.value += _opts.value;
    token.level += 1;
  } else if (isWs(token)) {
    token.type = 'Indent';
    token.value = _opts.value;
    token.level = 1;
  } else {
    before(token, {
      type: 'Indent',
      value: _opts.value,
      level: 1
    });
  }
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



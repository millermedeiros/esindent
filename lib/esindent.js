"use strict";

var rocambole = require('rocambole');
var specialParent = require('./specialParent');

var mixIn = require('mout/object/mixIn');

var getNodeKey = require('rocambole-node').getNodeKey;
var rToken = require('rocambole-token');
var isBr = rToken.isBr;
var isWs = rToken.isWs;
var isIndent = rToken.isIndent;
var remove = rToken.remove;
var before = rToken.before;
var findNext = rToken.findNext;
var findPrev = rToken.findPrev;

var defaultOptions = require('./defaultOptions');


// ---


var _opts;


// ---


exports.setOptions = setOptions;
function setOptions(opts){
  _opts = mixIn({}, defaultOptions, opts);
}

// setOptions need to be executed at least once
setOptions(null);


// transform AST in place
exports.transform = transform;
function transform(ast, opts) {
  if (opts !== undefined) setOptions(opts);
  rocambole.moonwalk(ast, transformNode);
  return ast;
}



exports.transformNode = transformNode;
function transformNode(node) {
  if (shouldIndentNode(node)) {
    var start = node.startToken;
    var end = node.endToken;

    if (node.parent && node.parent.type === 'IfStatement' &&
      getNodeKey(node) === 'test') {
      start = findPrev(start, '(');
      end = findNext(end, ')');
    } else if (node.type === 'ConditionalExpression') {
      start = start.next;
      end = end.next;
    } else {
      start = start.next;
    }

    indentInBetween(start, end);

    if (shouldIndentNodeType('ChainedMemberExpression') &&
        isChainedMemberExpressionArgument(node)) {
      indentInBetween(node.startToken.next, node.endToken.next);
    }
  }
}


function shouldIndentNode(node){
  return (!isSpecial(node) && shouldIndentNodeType(node.type)) ||
    (isSpecial(node.parent) && shouldIdentSpecial(node)) ||
    (shouldIndentNodeType('ChainedMemberExpression') &&
    isTopChainedMemberExpression(node)) ||
    (shouldIndentNodeType('MultipleVariableDeclaration') &&
    isMultipleVariableDeclaration(node));
}


function isSpecial(node) {
  return node && node.type in specialParent;
}


function shouldIndentNodeType(type) {
  return _opts[type];
}


function shouldIdentSpecial(node) {
  return shouldIndentNodeType(node.parent.type) &&
    specialParent[node.parent.type](node, _opts);
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



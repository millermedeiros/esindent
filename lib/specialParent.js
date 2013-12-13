"use strict";

// some nodes need special rules based on parent node + key, so we separate
// these on this module to "remove" complexity from the main module

var getNodeKey = require('rocambole-node').getNodeKey;


// ---


exports.IfStatement = function(node){
  // this will indent `if`, `else` and `else if` appropriately
  return match(node, 'IfStatement.consequent') ||
    (match(node, 'IfStatement.alternate') && node.type !== 'IfStatement');
};


exports.DoWhileStatement = makeMatch('DoWhileStatement.body');
exports.TryStatement = makeMatch('TryStatement.block', 'TryStatement.finalizer');



// ---


function makeMatch() {
  var types = Array.prototype.slice.call(arguments);
  return function matchTypes(node){
    return types.some(match.bind(this, node));
  };
}


function match(node, selector) {
  var parts = selector.split('.');
  return node.parent.type === parts[0] && getNodeKey(node) === parts[1];
}




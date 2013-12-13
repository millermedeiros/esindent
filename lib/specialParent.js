"use strict";

// some nodes need special rules based on parent node + key, so we separate
// these on this module to "remove" complexity from the main module

var getNodeKey = require('rocambole-node').getNodeKey;


// ---


exports.IfStatement = function(node){
  // this will indent `if`, `else` and `else if` appropriately
  var key = getNodeKey(node);
  return key === 'consequent' ||
    (key === 'alternate' && node.type !== 'IfStatement');
};


exports.DoWhileStatement = makeMatch('body');
exports.TryStatement = makeMatch('block', 'finalizer');



// ---


function makeMatch() {
  var keys = Array.prototype.slice.call(arguments);
  return function matchTypes(node){
    return keys.some(matchKey.bind(this, node));
  };
}


function matchKey(node, key) {
  return getNodeKey(node) === key;
}




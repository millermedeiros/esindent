"use strict";

// BlockComment special rules
// ---
// we store the original indent for block comments and wait until end of
// process to edit the raw value

var _comments;


exports.init = function(){
  _comments = [];
};


exports.saveIndent = function(comment) {
  if (comment.originalIndent != null) return;
  comment.originalIndent = comment.prev.value;
  _comments.push(comment);
};


exports.processAll = function() {
  _comments.forEach(updateBlockIndent);
};


function updateBlockIndent(comment) {
  var orig = new RegExp('([\\r\\n]+)' + comment.originalIndent, 'g');
  comment.raw = comment.raw.replace(orig, '$1'+ comment.prev.value);
}


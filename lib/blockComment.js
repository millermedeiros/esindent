"use strict";

// BlockComment special rules
// ---
// we store the original indent for block comments and wait until end of
// process to edit the raw value


exports.saveIndent = function(comment) {
  if (comment.originalIndent == null) {
    comment.originalIndent = comment.prev.value;
  }
};


exports.process = function(token) {
  if (token.originalIndent) {
    updateBlockIndent(token);
  }
};


function updateBlockIndent(comment) {
  var orig = new RegExp('([\\r\\n]+)' + comment.originalIndent, 'g');
  comment.raw = comment.raw.replace(orig, '$1'+ comment.prev.value);
}


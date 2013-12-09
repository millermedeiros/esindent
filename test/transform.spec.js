/*jshint node:true*/
/*global describe:false, it:false*/
"use strict";

var expect = require('chai').expect;
var rocambole = require('rocambole');
var _path = require('path');
var _fs = require('fs');

var esindent = require('../lib/esindent');


// ---


var COMPARE_FOLDER = _path.join(__dirname, 'compare');


// ---

function readIn(id) {
  return readFile(_path.join(COMPARE_FOLDER, id + '-in.js'));
}

function readOut(id) {
  return readFile(_path.join(COMPARE_FOLDER, id + '-out.js'));
}

function readFile(path) {
  return _fs.readFileSync(path).toString();
}

// ---


describe('esindent.transform()', function() {

  describe('default options', function() {

    it('should indent basic nodes', function() {
      var input = readIn('default');
      var compare = readOut('default');
      var ast = rocambole.parse(input);
      var result = esindent.transform(ast);
      // return AST and transform it in place
      expect( result ).to.eql( ast );
      expect( ast.toString() ).to.equal( compare );
    });

  });

});

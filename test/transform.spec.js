/*jshint node:true*/
/*global describe:false, it:false*/
"use strict";

var expect = require('chai').expect;
var rocambole = require('rocambole');
var _path = require('path');
var _fs = require('fs');
var _glob = require('glob');

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

function readConfig(id) {
  return JSON.parse(readFile(_path.join(COMPARE_FOLDER, id + '-config.json')));
}

function readFile(path) {
  return _fs.readFileSync(path).toString();
}

// ---


describe('esindent.transform()', function() {

  describe('default options', function() {

    var pattern = _path.join(__dirname, './compare/default/*-in.js');
    _glob.sync(pattern).forEach(function(fileName) {

      var id = fileName.replace(/.+(default\/.+)-in\.js/, '$1');

      it(id, function() {
        var input = readIn(id);
        var compare = readOut(id);
        var ast = rocambole.parse(input);
        var result = esindent.transform(ast);
        // return AST and transform it in place
        expect( result ).to.eql( ast );
        expect( ast.toString() ).to.equal( compare );
      });

    });

  });


  describe('custom options', function() {

    var pattern = _path.join(__dirname, './compare/custom/*-in.js');
    _glob.sync(pattern).forEach(function(fileName) {

      var id = fileName.replace(/.+(custom\/.+)-in\.js/, '$1');

      it(id, function() {
        var input = readIn(id);
        var config = readConfig(id);
        var compare = readOut(id);
        var ast = rocambole.parse(input);
        var result = esindent.transform(ast, config);
        // return AST and transform it in place
        expect( result ).to.eql( ast );
        expect( ast.toString() ).to.equal( compare );
      });

    });

  });
});

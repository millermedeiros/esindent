(function() {

// top level block isn't indented
var x = 123;

setTimeout(function() {
x();
});

}());

// don't mess up other code outside a function scope
var x = {
abc: 123
};


// also top level
define(['foo'], function (foo) {

var bar = 123;

foo(function(done) {
done(bar);
});

});


// indent, spaces
function foo(x) {
// comment
return x;
}


// weird braces
function weirdBraces(x)
{
// yeah, it's ugly
return x;
}


function nested(){
function deep(){
function triangle(){
function ofDoom(){
return foo;
}
}
}
}




var fn = function foo(){
// comment
return 'bar';
};


var foo = 123,
bar = function(a, b){
// mind bend
return function(c){
// meta
return a + b + c;
};
},
baz = 'dolor';

var fn = function foo()
{
// comment
return 'bar';
};


var foo = 123,
bar = function(a, b)
{
// mind bend
return function(c)
{
// meta
return a + b + c;
};
},
baz = 'dolor';



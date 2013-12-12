[];

  [1, 2, 3];

[1, 2, [3, 4, [5, 6, [7, 8, 9]]]];

function fn() {
return [4, 5, [6, 7, 8]];
}

    function fnAlreadyIndented() {
          return [4, 5,
            [6, 7, 8]
            ];
    }

var tuples = [
// comment test
["resolve", "done", "bla", "resolved"],
["reject", "fail", "lorem", "rejected"],
[
["lorem", "ipsum"]
],
["notify", "progress", "ipsum"]
];



// it should indent chained calls if there is a line break between each call
foo.bar()
// comment
.ipsum()
.dolor();

function foo() {
          dolor
          // comment
      .amet()
            .maecennas();
}

returned.promise().done(foo)
// comment
.done(newDefer.resolve)
  .fail(newDefer.reject)
// comment
.progress(newDefer.notify);


define(function() {
// line comment
x;
});



// if statement
if (true) {
    doSomething();
if (false) {
aintGoingToHappen(true);
} else {
        // lorem
  sure();
}
  } else {
    // ipsum
nope();
  }




// TryStatement
try {
// foo
foo()
} catch (e) {
// log
log(e)
} finally {
// bar
bar()
}



// Vars

var a,
b = true,
      c = 3,
  d = false;

  var asi = true
var amet = qwe();


// comments
var
    // foo var
foo,
        // bar variable
        bar = 'dolor amet';



// do while

do {
console.log(i++)
} while (i < 100);
do {
    i--
} while (i);

do n--; while (n && foo());

do n--; while (n && foo());
do ++i; while (amet(i));



// for

for (; i < n; ++i) {
// 4
for (; j > 0; --j) {
  // 5
      things[i][j];
}
}

// 6
for (;;) {
        things[i];
}

// 7 : indent + no braces
function foo() {
  for (var c = this._bindings.length, d; c--; )
    if (d = this._bindings[c], d._listener === a && d.context === b) return c;
  return -1
}


// ObjectExpression

foo.bar.Baz({
method2: function(){},
// comment
prop: 'dolor amet',
prop2: 123
});


function foo(a) {
    amet(123, a, {
flag: true
});
  }
ipsum({
    flag: true
  });
ipsum({
      // 2 flags
    flag: true,
  other: false
});
ipsum({
    flag: true,
  other: false
}, 789, 'bar');


var obj = {
foo: "bar",
'lorem': 123,
    // dolor
    dolor: new Date(),
  "re": /\w+/g
};


this.element
  .add()
  .set({
    // line comment
    // one more
    prop: "value"
  })
  .foo({
    // dolor
    dolor: "amet"
  });

define(name, {
_create: function() {
this.element
.add()
.set({
// line comment
// one more
prop: "value"
});
}
});




// WhileStatement

while (n--) {
// nested
while (i++) {
// moar nested
while (z++ < 0) {
        // inception
        foo();
  while (j++) {
    // deeper
    bar();
  }
}
}
}



// ForInStatement

for ( key in obj ) {
doFoo(obj[key]);
}
for ( key in obj ) doFoo(obj[key]);

for ( var k in o ) {
console.log(k, o[k]);
}

for ( key in obj ) {
for ( prop in obj[key] ) {
//indent
    console.log(prop)
}
}

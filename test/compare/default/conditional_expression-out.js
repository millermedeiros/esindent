// ConditionalExpression

a ? foo() : bar()

a ?
  foo() :
  bar()

a ?
  lorem :
  function() {
    return b;
  };


if (true) {
  // this is weird but "correct" if you think about how the indent rule works.
  // there are multiple nested conditionals and each one increases the indent
  // level by 1
  c = !a ? (!foo ? d : function() {
        return a;
      }) : b;
}

// from jquery
x = function(num) {
  return num == null ?

    // Return a 'clean' array
    this.toArray() :

    // Return just the object
    (object);
}

function x() {
  x.test(y) ?
    a :
    b;
}

num == null ?

  // Return a 'clean' array
  this.toArray() :

  // Return just the object
  (num < 0 ? this[this.length + num] : this[num]);

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


// it should indent chained calls if there is a line break between each call
foo.bar()
// comment
.ipsum()
.dolor();

function foo() {
dolor
// comment
.amet()
// empty line left on purpose to test bug


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


// ForStatement

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



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


x = {
  props: {
    // comment
    x: 1
  }
};


// issue #4
Ext.define('VMS.model.User', {
  extend: 'Ext.data.Model',
  idProperty: 'UserID',
  fields: [
    {
      name: 'UserID',
      type: 'int'
    },
    {
      name: 'FirstName',
      type: 'string'
    },
    {
      name: 'LastName',
      type: 'string'
    }
  ]
});

// this should be indented since property is on a separate line
Ext
  .define('VMS.model.User', {
    extend: 'Ext.data.Model',
    idProperty: 'UserID',
    fields: [
      {
        name: 'UserID',
        type: 'int'
      },
      {
        name: 'FirstName',
        type: 'string'
      },
      {
        name: 'LastName',
        type: 'string'
      }
    ]
  });


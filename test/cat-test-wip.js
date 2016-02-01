'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const test = require('tape');

const Cat = require('../lib/cat');
const shallowRenderer = TestUtils.createRenderer();

test('Cat', function (t) {
  //t.plan(2);

  let stuff = shallowRenderer.render(React.createElement(MyComponent, { className: 'MyComponent' }, 'some child text'));
  console.log(stuff);
});

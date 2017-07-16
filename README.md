# chai-snabbdom

[snabbdom](https://github.com/snabbdom/snabbdom) assertions for chai. Tests your virtual dom elements (vnodes). Snabbdom is the virtual dom implementation chosen to build [Cycle.js](https://cycle.js.org/) [DOM driver](https://github.com/cyclejs/cyclejs/tree/master/dom). Forked from André Staltz's [chai-virtual-dom](https://github.com/staltz/chai-virtual-dom).

<!--[![NPM version](http://img.shields.io/npm/v/chai-virtual-dom.svg?style=flat-square)](https://www.npmjs.org/package/chai-virtual-dom)
[![Build Status](https://travis-ci.org/staltz/chai-virtual-dom.svg?branch=master)](https://travis-ci.org/staltz/chai-virtual-dom)-->

#### Summary

```js
// Approximate match
// Use .look.like() to do an approximate assertion.
// Must match: tag name, id, className.
// Must match only if provided in expected: children.
expect(myVTree).to.look.like(expected);
```

```js
// Accurate match
// Use .look.exactly.like() to do a strict assertion.
// Must match: tag name, id, className, and children.
expect(myVTree).to.look.exactly.like(expected);
```

#### Example

```js
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-snabbdom'));
var h = require('snabbdom').h;

describe('My snabbdom project', function () {
  var myVTree = h('div#foo', [
    h('h1.header', {}, 'Welcome to our webpage'),
    h('ol.list', {}, [
      h('li', {}, 'First thing'),
      h('li', {}, 'Second thing'),
      h('li', {}, 'Third thing')
    ]),
  ]);

  it('should look roughly like a list', function () {
    var expected = h('div#foo', {}, [
      h('h1.header'),
      h('ol.list')
    ]);
    expect(myVTree).to.look.like(expected);
  });

  it('should look exactly like a list', function () {
    var expected = h('div#foo', {}, [
      h('h1.header', {}, 'Welcome to our webpage'),
      h('ol.list', {}, [
        h('li', {}, 'First thing'),
        h('li', {}, 'Second thing'),
        h('li', {}, 'Third thing')
      ]),
    ]);
    expect(myVTree).to.look.exactly.like(expected);
  });
});
```
<!--
#### Installation

This is a plugin for the [Chai Assertion Library](http://chaijs.com). Install via [npm](http://npmjs.org).

    npm install --save-dev chai-snabbdom

#### Usage

To use this plugin in your tests, import as such:

```js
var chai = require('chai');
chai.use(require('chai-snabbdom'));
```

-->

#### LICENSE

Copyright (c) 2017 Mathieu Eveillard. Licensed under the MIT license.

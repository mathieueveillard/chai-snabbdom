/* global describe, it */
const chai = require('chai');
const expect = chai.expect;
chai.use(require('../index'));
const h = require('snabbdom').h;

describe('chai snabbdom plugin', function () {
  describe('look.like()', function () {
    it('should assert vnode looks like itself', function () {
      const vnode = h('div.widget#foo', {}, [
        h('h1.header', {}, 'Welcome to our webpage'),
        h('section', {}, [
          h('span.label', {}, 'Your name is...'),
          h('input', {type: 'input'}),
          h('hr'),
          h('div.something')
        ]),
      ]);
      expect(vnode).to.look.like(vnode);
    });

    it('should assert vnode at least like expected', function () {
      const actualVNode = h('div.widget#foo', {}, [
        h('h1.header', {}, 'Welcome to our webpage'),
        h('section', {}, [
          h('span.label', {}, 'Your name is...'),
          h('input', {type: 'input'}),
          h('hr'),
          h('div.something')
        ]),
      ]);
      const expectedVNode1 = h('div.widget#foo');
      const expectedVNode2 = h('div.widget#foo', {}, [
        h('h1.header')
      ]);
      const expectedVNode3 = h('div.widget#foo', {}, [
        h('h1.header'),
        h('section', {}, [
          h('span.label'),
          h('input'),
          h('hr'),
          h('div.something')
        ])
      ]);
      expect(actualVNode).to.look.like(expectedVNode1);
      expect(actualVNode).to.look.like(expectedVNode2);
      expect(actualVNode).to.look.like(expectedVNode3);
    });

    it('should fail if vnode does not exactly match id and className', function () {
      const actualVNode = h('div.widget#foo', {}, [
        h('h1.header', {}, 'Welcome to our webpage'),
        h('section', {}, [
          h('span.label', {}, 'Your name is...'),
          h('input', {type: 'input'}),
          h('hr'),
          h('div.something')
        ]),
      ]);
      const expectedVNode1 = h('div');
      const expectedVNode2 = h('div.widget#foo', {}, [
        h('h1')
      ]);
      expect(function () {
        expect(actualVNode).to.look.like(expectedVNode1);
        expect(actualVNode).to.look.like(expectedVNode2);
      }).to.throw();
    });
  });

  describe('look.exactly.like()', function () {
    it('should assert vnode looks exactly like itself', function () {
      const vnode = h('div.widget#foo', {}, [
        h('h1.header', {}, 'Welcome to our webpage'),
        h('section', {}, [
          h('span.label', {}, 'Your name is...'),
          h('input', {type: 'input'}),
          h('hr'),
          h('div.something')
        ]),
      ]);
      expect(vnode).to.look.exactly.like(vnode);
    });

    it('should assert another vnode looks exactly like itself', function () {
      const actualVNode = h('ul.list', {}, [
        h('li.item', {}, 'Foo'),
        h('li.item', {}, 'Bar'),
        h('li.item', {}, 'Baz'),
      ]);
      const expectedVNode = h('ul.list', {}, [
        h('li.item', {}, 'Foo'),
        h('li.item', {}, 'Bar'),
        h('li.item', {}, 'Baz'),
      ]);
      expect(actualVNode).to.look.exactly.like(expectedVNode);
    });

    it('should fail if actual vnode is has more children than expected', function () {
      const actualVNode = h('div.widget#foo', {}, [
        h('h1.header', {}, 'Welcome to our webpage'),
        h('section', {}, [
          h('span.label', {}, 'Your name is...'),
          h('input', {type: 'input'}),
          h('hr'),
          h('div.something')
        ]),
      ]);
      const expectedVNode1 = h('div.widget#foo');
      const expectedVNode2 = h('div.widget#foo', {}, [
        h('h1.header')
      ]);
      const expectedVNode3 = h('div.widget#foo', {}, [
        h('h1.header'),
        h('section', {}, [
          h('span.label'),
          h('input'),
          h('hr'),
          h('div.something')
        ])
      ]);
      expect(function () {
        expect(actualVNode).to.look.exactly.like(expectedVNode1);
        expect(actualVNode).to.look.exactly.like(expectedVNode2);
        expect(actualVNode).to.look.exactly.like(expectedVNode3);
      }).to.throw();
    });

    it('should fail if vnode does not exactly match id and className', function () {
      const actualVNode = h('div.widget#foo', {}, [
        h('h1.header', {}, 'Welcome to our webpage'),
        h('section', {}, [
          h('span.label', {}, 'Your name is...'),
          h('input', {type: 'input'}),
          h('hr'),
          h('div.something')
        ]),
      ]);
      const expectedVNode1 = h('div');
      const expectedVNode2 = h('div.widget#foo', {}, [
        h('h1')
      ]);
      expect(function () {
        expect(actualVNode).to.look.exactly.like(expectedVNode1);
        expect(actualVNode).to.look.exactly.like(expectedVNode2);
      }).to.throw();
    });
  });
});

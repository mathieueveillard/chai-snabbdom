const toHTML = require('snabbdom-to-html');

function assertProperty(actualVNode, expectedVNode, prop) {
  this.assert(
    actualVNode.data.props[prop] === expectedVNode.data.props[prop],
    'expected\n\n#{act}\n\nto have the same ' + prop + ' as\n\n#{exp}',
    'expected\n\n#{act}\n\nto not have the same ' + prop + ' as\n\n#{exp}',
    toHTML(expectedVNode),
    toHTML(actualVNode)
  );
}

function assertVirtualNodeExactly(actualVNode, expectedVNode) {
  this.assert(
    toHTML(actualVNode) === toHTML(expectedVNode),
    'expected\n\n#{act}\n\nto look exactly like\n\n#{exp}',
    'expected\n\n#{act}\n\nto not look exactly like\n\n#{exp}',
    toHTML(expectedVNode),
    toHTML(actualVNode)
  );
}

function assertVirtualNode(actualVNode, expectedVNode) {
  if (this._exactly) {
    assertVirtualNodeExactly.call(this, actualVNode, expectedVNode);
    return;
  }
  this.assert(
    actualVNode.sel === expectedVNode.sel,
    'expected\n\n#{act}\n\nto have the same selector (tag name + class and/or id) as\n\n#{exp}',
    'expected\n\n#{act}\n\nto not have the same selector (tag name + class and/or id) as\n\n#{exp}',
    toHTML(expectedVNode),
    toHTML(actualVNode)
  );
  actualVNode.children = actualVNode.children || [];
  expectedVNode.children = expectedVNode.children || [];
  this.assert(
    actualVNode.children.length >= expectedVNode.children.length,
    'expected\n\n#{act}\n\nto have at least as many children as as\n\n#{exp}',
    'expected\n\n#{act}\n\nto not have as many children as\n\n#{exp}',
    toHTML(expectedVNode),
    toHTML(actualVNode)
  );
  for (let i = expectedVNode.children.length - 1; i >= 0; i--) {
    assertVirtualNode.call(this,
      actualVNode.children[i],
      expectedVNode.children[i]
    );
  }
}

function chaiVirtualDOMPlugin(chai) {
  chai.Assertion.addProperty('look', function addPropertyLook() {
    return this;
  });

  chai.Assertion.addChainableMethod('exactly',
    function exactlyAsMethod() {
      throw new Error('Exactly like what? You used the chai assertion probably ' +
        'with some missing method. You probably used it as ' +
        '`expect(output).to.look.exactly`, while it is meant to be used as ' +
        '`expect(output).to.look.exactly.like(expected)`.');
    },
    function exactlyAsProperty() {
      this._exactly = true;
    }
  );

  chai.Assertion.addMethod('like', function like(expectedVNode) {
    const actualVNode = this._obj;
    assertVirtualNode.call(this, actualVNode, expectedVNode);
  });
}

module.exports = chaiVirtualDOMPlugin;

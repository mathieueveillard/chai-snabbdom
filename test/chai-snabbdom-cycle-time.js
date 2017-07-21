const chai = require('chai')
const expect = chai.expect
chai.use(require('../index'))
const h = require('snabbdom').h
const mockTimeSource = require('@cycle/time').mockTimeSource

describe('chai-snabbdom', function () {
    it('should be compatible with @cycle-time', function (done) {

        const actualVNode = h('div.widget#foo', {}, [
            h('h1.header', {}, 'Welcome to our webpage'),
            h('section', {}, [
                h('span.label', {}, 'Your name is...'),
                h('input', {type: 'input'}),
                h('hr'),
                h('div.something')
            ]),
        ])

        const expectedVNode = h('div.widget#foo')

        const Time = mockTimeSource()

        const actualVNode$      = Time.diagram('---x---x---x---x---|').mapTo(actualVNode)

        const expectedVNode$    = Time.diagram('---x---x---x---x---|').mapTo(expectedVNode)

        Time.assertEqual(
            actualVNode$,
            expectedVNode$,
            (actualVNode, expectedVNode) => expect(actualVNode).to.look.like(expectedVNode))

        Time.run(done)
    })
})
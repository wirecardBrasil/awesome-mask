import { allowedKeys, inputHandler } from '@/event-listener'
import Vue from 'vue'

describe('Detect characters as invalid', () => {

  let el = {}
  let mask = 'AAA-9999';
  let ev = {}

  beforeEach(function () {
    el = document.createElement('input');
    el.type = 'text';
    el.dataset.mask = mask;
    ev.target = el;
    ev.preventDefault = () => {};
    document.querySelector('body').appendChild(el);
  })

  it('should detect allowedKeys', () => {
    expect(allowedKeys.indexOf(9) > -1).to.be.true
    expect(allowedKeys.indexOf(37) > -1).to.be.true
    expect(allowedKeys.indexOf(38) > -1).to.be.true
    expect(allowedKeys.indexOf(39) > -1).to.be.true
    expect(allowedKeys.indexOf(40) > -1).to.be.true
  })

  it('should format value on listener', () => {
    ev.target.value = 'ABD9999'
    inputHandler(ev)
    setTimeout( () => {
      expect(ev.target.value).to.be.equal('ABD-9999')
    }, 100)
  })
})

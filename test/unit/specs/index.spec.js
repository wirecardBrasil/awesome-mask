import Vue from 'vue'
import index  from '@/index'

describe('Directive', () => {
  let el = {}
  let binding = {}
  let mask = 'AAA-9999';

  beforeEach(function () {
    el = document.createElement('input');
    el.type = 'text';
    binding.value = mask
    document.querySelector('body').appendChild(el);
  })

  it('should bind and format value', () => {
    el.value = 'ABC9424'
    index.bind(el ,binding)
    expect(el.value).to.be.equal('ABC-9424')
  })

  it('should verify if it has the correct maxlength', () => {
    el.value = 'ABC9424'
    index.bind(el ,binding)
    expect(el.getAttribute('maxlength')).to.be.equal(mask.length.toString())
  })

  it('should add mask to dataset', () => {
    el.value = 'ABC9424'
    index.bind(el ,binding)
    expect(el.dataset.mask).to.be.equal(mask)
  })

  it('should cut the value to mask length', () => {
    el.value = 'ABC942442424242'
    index.bind(el ,binding)
    expect(el.value).to.be.equal('ABC-9424')
  })

  it('should add mask to dataset', () => {
    el.value = 'ABC9424'
    index.bind(el ,binding)
    expect(el.dataset.mask).to.be.equal(mask)
  })
})

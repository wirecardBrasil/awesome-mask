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

  it('should bind and format money value', () => {
    el.value = '123999'
    binding.value = 'money'
    index.bind(el ,binding)
    expect(el.value).to.be.equal('1.239,99')
  })

  it('should bind and format negative money value', () => {
    el.value = '-123999'
    binding.value = 'money'
    index.bind(el ,binding)
    expect(el.value).to.be.equal('-1.239,99')
  })

  it('should verify if it has the correct maxlength', () => {
    el.value = 'ABC9424'
    index.bind(el ,binding)
    expect(el.getAttribute('maxlength')).to.be.equal(mask.length.toString())
  })

  it('should cut the value to mask length', () => {
    el.value = 'ABC942442424242'
    index.bind(el ,binding)
    expect(el.value).to.be.equal('ABC-9424')
  })

  it('should allow passing options', () => {
    el.value = '123999'
    binding.value = {value: 'money', separator: '.', delimiter: ','};
    index.bind(el ,binding)
    expect(el.value).to.be.equal('1,239.99')
  });
})

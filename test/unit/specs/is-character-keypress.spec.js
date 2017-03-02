import Vue from 'vue'
import { isCharacterKeyPress } from '@/is-character-keypress'



function keyPress(key) {
  var event = document.createEvent('Event');
  event.keyCode = key;
  event.which = key;
  event.initEvent('keydown');
  document.dispatchEvent(event);
  return event;
}

describe('Detect characters as invalid', () => {
  it('should detect ctrlKey', () => {
    let ev = keyPress(49)
    ev.ctrlKey = true
    expect(isCharacterKeyPress(ev)).to.be.false
  })
  it('should detect altKey as invalid', () => {
    let ev = keyPress(49)
    ev.altKey = true
    expect(isCharacterKeyPress(ev)).to.be.false
  })
  it('should detect metaKey as invalid', () => {
    let ev = keyPress(49)
    ev.metaKey = true
    expect(isCharacterKeyPress(ev)).to.be.false
  })
  it('should detect tab as valid', () => {
    let ev = keyPress(49)
    expect(isCharacterKeyPress(ev)).to.be.true
  })
})

import { isCharacterKeyPress } from './is-character-keypress';
import VMasker from 'vanilla-masker'

export const allowedKeys = [
  9, // 'tab'
  37, // 'left'
  38, // 'up'
  39, // 'right'
  40, // 'down'
]

export const inputHandler = (ev) => {
  let mask = ev.target.getAttribute('data-mask')
  let isCharacter = isCharacterKeyPress(ev)
  let isAllowedKey = allowedKeys.indexOf(ev.keyCode) > -1
  if(isAllowedKey) return;
  if (isCharacter && ev.target.value.length >= mask.length ) {
    ev.preventDefault();
  }
  setTimeout(() => {
    maskInput(mask, ev.target)
    broadcast(ev);
  }, 0)
}

let maskInput = (mask, input) => {
  if(mask === 'money'){
    input.value = VMasker.toMoney(input.value, {showSignal: true});
  } else {
    input.value = mask && mask.length > 0 ? VMasker.toPattern(input.value, mask) : input.value
  }
}

let broadcast = (ev) => {
  let inputEvent = null
  let changeEvent = null

  try {
    inputEvent = new Event('input');
    changeEvent = new Event('change');
  } catch (err) {
    inputEvent = document.createEvent('Event')
    changeEvent = document.createEvent('Event')

    inputEvent.initEvent('input', false, false)
    changeEvent.initEvent('change', false, false)
  }

  ev.target.dispatchEvent(inputEvent);
  ev.target.dispatchEvent(changeEvent);
}

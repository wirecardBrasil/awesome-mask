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
  let mask = ev.target.dataset.mask
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
    input.value = VMasker.toMoney(input.value);
  } else {
    input.value = mask && mask.length > 0 ? VMasker.toPattern(input.value, mask) : input.value
  }
}

let broadcast = (ev) => {
  let inputEvent = new Event('input');
  ev.target.dispatchEvent(inputEvent);
  let changeEvent = new Event('change');
  ev.target.dispatchEvent(changeEvent);
}

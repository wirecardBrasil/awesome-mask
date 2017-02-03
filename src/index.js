'use strict'

import VMasker from 'vanilla-masker'
import { isCharacterKeyPress } from './is-character-keypress';

let allowedKeys = [
  9, // 'tab'
  37, // 'left'
  38, // 'up'
  39, // 'right'
  40, // 'down'
]

let inputHandler = (ev) => {
  let mask = ev.target.dataset.mask
  let isCharacter = isCharacterKeyPress(ev)
  let isAllowedKey = allowedKeys.indexOf(ev.keyCode) > -1
  if(isAllowedKey) return;
  if (isCharacter && ev.target.value.length >= mask.length ) {
    ev.preventDefault();
  }
  setTimeout( () => {
    ev.target.value = mask && mask.length > 0 ? VMasker.toPattern(ev.target.value, mask) : ev.target.value
  }, 0);
}

export default {
  bind (el, binding) {
    if(binding.value.length < 1) return
    el.dataset.mask = binding.value
    el.setAttribute('maxlength', el.dataset.mask.length)
    el.addEventListener('keydown', inputHandler)
  },
  unbind(el, binding) {
    if(binding.value.length < 1) return
    el.removeAttribute('maxlength')
    el.removeEventListener('keydown', inputHandler)
  }
}

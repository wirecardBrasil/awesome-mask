'use strict'

import VMasker from 'vanilla-masker'
import { isCharacterKeyPress } from './is-character-keypress';

let inputHandler = (ev) => {
  let mask = ev.target.dataset.mask
  let isCharacter = isCharacterKeyPress(ev) && ev.keyCode !== 9;
  if (isCharacter && ev.target.value.length >= mask.length) {
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
  unbind(el) {
    if(binding.value.length < 1) return
    el.removeAttribute('maxlength')
    el.removeEventListener('keydown', inputHandler)
  }
}

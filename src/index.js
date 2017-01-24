'use strict'

import VMasker from 'vanilla-masker'
import { isCharacterKeyPress } from './is-character-keypress';



let inputHandler = (ev) => {
  let mask = ev.target.dataset.mask
  let isCharacter = isCharacterKeyPress(ev) && ev.keyCode !== 9;
  if (isCharacter && ev.target.value.length >= ev.target.dataset.mask.length) {
    ev.preventDefault();
  }
  ev.target.value = mask ? VMasker.toPattern(ev.target.value, mask) : ev.target.value
}

export default {
  bind (el, binding) {
    el.dataset.mask = binding.value
    el.setAttribute("maxlength", el.dataset.mask.length)
    el.addEventListener('keydown', inputHandler)
  },
  unbind(el) {
    el.removeAttribute("maxlength")
    el.removeEventListener('keydown', inputHandler)
  }
}

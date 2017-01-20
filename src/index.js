'use strict'

import VMasker from 'vanilla-masker'

let mask = {};

let inputHandler = (ev) => {
  ev.target.value = mask ? VMasker.toPattern(ev.target.value, mask) : ev.target.value
}

export default {
  bind (el, binding) {
    mask = binding.value;
    el.addEventListener('input', inputHandler)
  },
  update (el, binding) {
    mask = binding.value;
  },
  unbind(el) {
    el.addEventListener('input', inputHandler)
  }
}

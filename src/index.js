'use strict'

import VMasker from 'vanilla-masker'



let inputHandler = (ev) => {
  let mask = ev.target.dataset.mask
  ev.target.value = mask ? VMasker.toPattern(ev.target.value, mask) : ev.target.value
}

export default {
  bind (el, binding) {
    el.dataset.mask = binding.value;
    el.addEventListener('input', inputHandler)
  },
  update (el, binding) {
    el.dataset.mask = binding.value;
  },
  unbind(el) {
    el.removeEventListener('input', inputHandler)
  }
}

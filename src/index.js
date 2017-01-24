'use strict'

import VMasker from 'vanilla-masker'

let inputHandler = (ev) => {
  let mask = ev.target.dataset.mask
  ev.target.value = mask ? VMasker.toPattern(ev.target.value, mask) : ev.target.value
}

export default {
  bind (el, binding) {
    el.dataset.mask = binding.expression
    el.setAttribute("maxlength", binding.expression.length)
    el.addEventListener('input', inputHandler)
  },
  unbind(el) {
    el.removeAttribute("maxlength")
    el.removeEventListener('input', inputHandler)
  }
}

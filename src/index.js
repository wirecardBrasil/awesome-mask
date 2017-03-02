'use strict'

import VMasker from 'vanilla-masker'
import Vue from 'vue'
import { inputHandler } from './event-listener'

let applyMaskToDefault = (el, mask) => {
  let isInputText = el instanceof HTMLInputElement ;
  let inputText = el;
  if(!isInputText){
    inputText = el.querySelector('input')
  }
  inputText.value = mask && mask.length > 0 ? VMasker.toPattern(inputText.value, mask) : inputText.value
}

export default {
  bind (el, binding) {
    if(binding.value.length < 1) return
    el.dataset.mask = binding.value
    applyMaskToDefault(el ,binding.value)
    el.setAttribute('maxlength', el.dataset.mask.length)
    el.addEventListener('keyup', inputHandler)
  },
  update(el, binding) {
    // this is only for v-model
    if(binding.value.length < 1) return
    applyMaskToDefault(el ,binding.value)
  },
  unbind(el, binding) {
    if(binding.value.length < 1) return
    el.removeAttribute('maxlength')
    el.removeEventListener('keyup', inputHandler)
  }
}

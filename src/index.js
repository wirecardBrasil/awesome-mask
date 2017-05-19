'use strict'

import VMasker from 'vanilla-masker'
import Vue from 'vue'
import { inputHandler } from './event-listener'

let applyMaskToDefault = (el, mask, isMoney) => {
  let isInputText = el instanceof HTMLInputElement ;
  let inputText = el;
  if(!isInputText){
    inputText = el.querySelector('input')
  }
  if(isMoney && inputText.value > 0){
    inputText.value = VMasker.toMoney(inputText.value);
  } else {
    inputText.value = mask && mask.length > 0 ? VMasker.toPattern(inputText.value, mask) : inputText.value
  }
}

export default {
  bind (el, binding) {
    let isMoney = false;
    if(binding.value.length < 1) return
    el.dataset.mask = binding.value
    if(binding.value === 'money'){
      isMoney = true;
    } else {
      el.setAttribute('maxlength', el.dataset.mask.length)
    }
    applyMaskToDefault(el ,binding.value, isMoney)
    el.addEventListener('keyup', inputHandler)
  },
  update(el, binding) {
    // this is only for v-model
    if(binding.value.length < 1) return
    if(binding.value === 'money'){
      applyMaskToDefault(el ,binding.value, true)
      return
    }
    el.dataset.mask = binding.value;
    el.setAttribute('maxlength', el.dataset.mask.length)
    applyMaskToDefault(el ,binding.value)
  },
  unbind(el, binding) {
    if(binding.value.length < 1) return
    el.removeAttribute('maxlength')
    el.removeEventListener('keyup', inputHandler)
  }
}

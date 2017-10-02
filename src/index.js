'use strict'

import VMasker from 'vanilla-masker'
import Vue from 'vue'
import { inputHandler } from './event-listener'

let applyMaskToDefault = (el, mask, isMoney) => {
  const inputText = getInputText(el);
  if(isMoney && inputText.value.length > 0){
    inputText.value = VMasker.toMoney(inputText.value);
  } else {
    inputText.value = mask && mask.length > 0 ? VMasker.toPattern(inputText.value, mask) : inputText.value
  }
}

let getInputText = (el) => {
  let isInputText = el instanceof HTMLInputElement ;
  let inputText = el;
  if(!isInputText){
    inputText = el.querySelector('input')
  }
  return inputText;
}

export default {
  bind (el, binding) {
    let isMoney = false;
    if(binding.value.length < 1) return
    const inputText = getInputText(el);
    inputText.dataset.mask = binding.value
    if(binding.value === 'money'){
      isMoney = true;
    } else {
      inputText.setAttribute('maxlength', inputText.dataset.mask.length)
    }
    applyMaskToDefault(inputText, binding.value, isMoney)
    inputText.addEventListener('keyup', inputHandler)
  },
  update(el, binding) {
    // this is only for v-model
    if(binding.value.length < 1) return
    const inputText = getInputText(el);
    if(binding.value === 'money'){
      applyMaskToDefault(inputText ,binding.value, true)
      return
    }
    inputText.dataset.mask = binding.value;
    inputText.setAttribute('maxlength', inputText.dataset.mask.length)
    applyMaskToDefault(inputText ,binding.value)
  },
  unbind(el, binding) {
    if(binding.value.length < 1) return
    const inputText = getInputText(el);
    inputText.removeAttribute('maxlength')
    inputText.removeEventListener('keyup', inputHandler)
  }
}
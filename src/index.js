'use strict'

import VMasker from 'vanilla-masker'
import Vue from 'vue'
import { inputHandler } from './event-listener'

const applyMaskToDefault = (el, mask, isMoney, opts) => {
  const inputText = getInputText(el)
  const isMoneyType = isMoney && inputText.value.length > 0

  if (isMoneyType) {
    inputText.value = VMasker.toMoney(inputText.value, Object.assign({showSignal: true}, opts))
  } else {
    inputText.value = mask && mask.length > 0
      ? VMasker.toPattern(inputText.value, Object.assign({pattern: mask}, opts))
      : inputText.value
  }
}

const setMaxLength = (inputText) => {
  let maskSize = inputText.getAttribute('data-mask').length
  inputText.setAttribute('maxlength', maskSize)
}

const getInputText = (el) => {
  return !el instanceof HTMLInputElement ? el.querySelector('input') : el
}
const getOpts = (value) => {
  if (typeof value === 'object') {
    return value;
  }
  return { value }
};

export default {
  bind (el, binding) {
    if(binding.value.length < 1) return

    const inputText = getInputText(el)
    const opts = getOpts(binding.value);
    const isMoney = opts.value === 'money'
    inputText.setAttribute('data-mask', opts.value)
    inputText.addEventListener('keyup', inputHandler)

    !isMoney && setMaxLength(inputText)
    applyMaskToDefault(inputText, opts.value, isMoney, opts)
  },
  update(el, binding) {
    // this is only for v-model
    if(binding.value.length < 1) return
    const inputText = getInputText(el)
    const opts = getOpts(binding.value);
    const isMoney = opts.value === 'money'

    if(!isMoney) {
      inputText.setAttribute('data-mask', opts.value)
      inputText.setAttribute('maxlength', inputText.getAttribute('data-mask').length)
    }

    applyMaskToDefault(inputText, opts.value, isMoney, opts)
  },
  unbind(el, binding) {
    if(binding.value.length < 1) return
    const inputText = getInputText(el)
    inputText.removeAttribute('maxlength')
    inputText.removeEventListener('keyup', inputHandler)
  }
}



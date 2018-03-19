'use strict'

import VMasker from 'vanilla-masker'
import Vue from 'vue'
import { inputHandler } from './event-listener'

const applyMaskToDefault = (el, mask, isMoney) => {
  const inputText = getInputText(el)
  const isMoneyType = isMoney && inputText.value.length > 0

  if (isMoneyType) {
    inputText.value = VMasker.toMoney(inputText.value, {showSignal: true})
  } else {
    inputText.value = mask && mask.length > 0
      ? VMasker.toPattern(inputText.value, mask)
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

export default {
  bind (el, binding) {
    if(binding.value.length < 1) return

    const inputText = getInputText(el)
    const isMoney = binding.value === 'money'
    inputText.setAttribute('data-mask', binding.value)
    inputText.addEventListener('keyup', inputHandler)

    !isMoney && setMaxLength(inputText)
    applyMaskToDefault(inputText, binding.value, isMoney)
  },
  update(el, binding) {
    // this is only for v-model
    if(binding.value.length < 1) return
    const inputText = getInputText(el)
    const isMoney = binding.value === 'money'

    if(!isMoney) {
      inputText.setAttribute('data-mask', binding.value)
      inputText.setAttribute('maxlength', inputText.getAttribute('data-mask').length)
    }

    applyMaskToDefault(inputText ,binding.value, isMoney)
  },
  unbind(el, binding) {
    if(binding.value.length < 1) return
    const inputText = getInputText(el)
    inputText.removeAttribute('maxlength')
    inputText.removeEventListener('keyup', inputHandler)
  }
}



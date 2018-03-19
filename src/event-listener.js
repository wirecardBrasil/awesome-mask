import { isCharacterKeyPress } from './is-character-keypress'
import VMasker from 'vanilla-masker'

export const allowedKeys = [
  9, // 'tab'
  37, // 'left'
  38, // 'up'
  39, // 'right'
  40, // 'down'
]

export const inputHandler = (ev) => {
  const mask = ev.target.getAttribute('data-mask')
  if(isAllowedKey(ev.keyCode)) return
  if (isCharacterKeyPress(ev)
        && ev.target.value.length >= mask.length ) {
    ev.preventDefault()
  }
  setTimeout(() => {
    maskInput(mask, ev.target)
    broadcast(ev)
  }, 0)
}

const isAllowedKey = (code) => {
  return allowedKeys.some(key => key == code)
}

const maskInput = (mask, input) => {
  if(mask === 'money'){
    input.value = VMasker.toMoney(input.value, {showSignal: true})
  } else {
    input.value = mask && mask.length > 0
      ? VMasker.toPattern(input.value, mask)
      : input.value
  }
}

const broadcast = (ev) => {
  let inputEvent = null
  let changeEvent = null

  ({ inputEvent, changeEvent } = initEvents(inputEvent, changeEvent))

  ev.target.dispatchEvent(inputEvent)
  ev.target.dispatchEvent(changeEvent)
}

const getEventForOldBrowser = (eventType) => {
  const ev = document.createEvent('Event')
  ev.initEvent(eventType, false, false)
}

const initEvents = (inputEvent, changeEvent) => {
  try {
    inputEvent = new Event('input')
    changeEvent = new Event('change')
  }
  catch (err) {
    inputEvent = getEventForOldBrowser('input')
    changeEvent = getEventForOldBrowser('change')
  }
  return { inputEvent, changeEvent }
}

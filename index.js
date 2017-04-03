'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vanillaMasker = require('vanilla-masker');

var _vanillaMasker2 = _interopRequireDefault(_vanillaMasker);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _eventListener = require('./event-listener');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyMaskToDefault = function applyMaskToDefault(el, mask, isMoney) {
  var isInputText = el instanceof HTMLInputElement;
  var inputText = el;
  if (!isInputText) {
    inputText = el.querySelector('input');
  }
  if (isMoney && inputText.value > 0) {
    inputText.value = _vanillaMasker2.default.toMoney(inputText.value);
  } else {
    inputText.value = mask && mask.length > 0 ? _vanillaMasker2.default.toPattern(inputText.value, mask) : inputText.value;
  }
};

exports.default = {
  bind: function bind(el, binding) {
    var isMoney = false;
    if (binding.value.length < 1) return;
    el.dataset.mask = binding.value;
    if (binding.value === 'money') {
      isMoney = true;
    } else {
      el.setAttribute('maxlength', el.dataset.mask.length);
    }
    applyMaskToDefault(el, binding.value, isMoney);
    el.addEventListener('keyup', _eventListener.inputHandler);
  },
  update: function update(el, binding) {
    // this is only for v-model
    if (binding.value.length < 1) return;
    el.dataset.mask = binding.value;
    el.setAttribute('maxlength', el.dataset.mask.length);
    applyMaskToDefault(el, binding.value);
  },
  unbind: function unbind(el, binding) {
    if (binding.value.length < 1) return;
    el.removeAttribute('maxlength');
    el.removeEventListener('keyup', _eventListener.inputHandler);
  }
};
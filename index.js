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
  var inputText = getInputText(el);
  var isMoneyType = isMoney && inputText.value.length > 0;

  if (isMoneyType) {
    inputText.value = _vanillaMasker2.default.toMoney(inputText.value, { showSignal: true });
  } else {
    inputText.value = mask && mask.length > 0 ? _vanillaMasker2.default.toPattern(inputText.value, mask) : inputText.value;
  }
};

var setMaxLength = function setMaxLength(inputText) {
  var maskSize = inputText.getAttribute('data-mask').length;
  inputText.setAttribute('maxlength', maskSize);
};

var getInputText = function getInputText(el) {
  return !el instanceof HTMLInputElement ? el.querySelector('input') : el;
};

exports.default = {
  bind: function bind(el, binding) {
    if (binding.value.length < 1) return;

    var inputText = getInputText(el);
    var isMoney = binding.value === 'money';
    inputText.setAttribute('data-mask', binding.value);
    inputText.addEventListener('keyup', _eventListener.inputHandler);

    !isMoney && setMaxLength(inputText);
    applyMaskToDefault(inputText, binding.value, isMoney);
  },
  update: function update(el, binding) {
    // this is only for v-model
    if (binding.value.length < 1) return;
    var inputText = getInputText(el);
    var isMoney = binding.value === 'money';

    if (!isMoney) {
      inputText.setAttribute('data-mask', binding.value);
      inputText.setAttribute('maxlength', inputText.getAttribute('data-mask').length);
    }

    applyMaskToDefault(inputText, binding.value, isMoney);
  },
  unbind: function unbind(el, binding) {
    if (binding.value.length < 1) return;
    var inputText = getInputText(el);
    inputText.removeAttribute('maxlength');
    inputText.removeEventListener('keyup', _eventListener.inputHandler);
  }
};
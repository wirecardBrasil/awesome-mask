'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vanillaMasker = require('vanilla-masker');

var _vanillaMasker2 = _interopRequireDefault(_vanillaMasker);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _eventListener = require('./event-listener');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyMaskToDefault = function applyMaskToDefault(el, mask, isMoney, opts) {
  var inputText = getInputText(el);
  var isMoneyType = isMoney && inputText.value.length > 0;

  if (isMoneyType) {
    inputText.value = _vanillaMasker2.default.toMoney(inputText.value, Object.assign({ showSignal: true }, opts));
  } else {
    inputText.value = mask && mask.length > 0 ? _vanillaMasker2.default.toPattern(inputText.value, Object.assign({ pattern: mask }, opts)) : inputText.value;
  }
};

var setMaxLength = function setMaxLength(inputText) {
  var maskSize = inputText.getAttribute('data-mask').length;
  inputText.setAttribute('maxlength', maskSize);
};

var getInputText = function getInputText(el) {
  return !el instanceof HTMLInputElement ? el.querySelector('input') : el;
};
var getOpts = function getOpts(value) {
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    return value;
  }
  return { value: value };
};

exports.default = {
  bind: function bind(el, binding) {
    if (binding.value.length < 1) return;

    var inputText = getInputText(el);
    var opts = getOpts(binding.value);
    var isMoney = opts.value === 'money';
    inputText.setAttribute('data-mask', opts.value);
    inputText.addEventListener('keyup', _eventListener.inputHandler);

    !isMoney && setMaxLength(inputText);
    applyMaskToDefault(inputText, opts.value, isMoney, opts);
  },
  update: function update(el, binding) {
    // this is only for v-model
    if (binding.value.length < 1) return;
    var inputText = getInputText(el);
    var opts = getOpts(binding.value);
    var isMoney = opts.value === 'money';

    if (!isMoney) {
      inputText.setAttribute('data-mask', opts.value);
      inputText.setAttribute('maxlength', inputText.getAttribute('data-mask').length);
    }

    applyMaskToDefault(inputText, opts.value, isMoney, opts);
  },
  unbind: function unbind(el, binding) {
    if (binding.value.length < 1) return;
    var inputText = getInputText(el);
    inputText.removeAttribute('maxlength');
    inputText.removeEventListener('keyup', _eventListener.inputHandler);
  }
};
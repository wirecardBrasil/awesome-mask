'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vanillaMasker = require('vanilla-masker');

var _vanillaMasker2 = _interopRequireDefault(_vanillaMasker);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _isCharacterKeypress = require('./is-character-keypress');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allowedKeys = [9, // 'tab'
37, // 'left'
38, // 'up'
39, // 'right'
40];

var inputHandler = function inputHandler(ev) {
  var mask = ev.target.dataset.mask;
  var isCharacter = (0, _isCharacterKeypress.isCharacterKeyPress)(ev);
  var isAllowedKey = allowedKeys.indexOf(ev.keyCode) > -1;
  if (isAllowedKey) return;
  if (isCharacter && ev.target.value.length >= mask.length) {
    ev.preventDefault();
  }
  setTimeout(function () {
    ev.target.value = mask && mask.length > 0 ? _vanillaMasker2.default.toPattern(ev.target.value, mask) : ev.target.value;
  }, 0);
};

var applyMaskToDefault = function applyMaskToDefault(el, mask) {
  var isInputText = el instanceof HTMLInputElement;
  var inputText = el;
  if (!isInputText) {
    inputText = el.querySelector('input');
  }
  inputText.value = mask && mask.length > 0 ? _vanillaMasker2.default.toPattern(inputText.value, mask) : inputText.value;
};

exports.default = {
  bind: function bind(el, binding) {
    if (binding.value.length < 1) return;
    el.dataset.mask = binding.value;
    applyMaskToDefault(el, binding.value);
    el.setAttribute('maxlength', el.dataset.mask.length);
    el.addEventListener('keydown', inputHandler);
  },
  update: function update(el, binding) {
    // this is only for v-model
    if (binding.value.length < 1) return;
    applyMaskToDefault(el, binding.value);
  },
  unbind: function unbind(el, binding) {
    if (binding.value.length < 1) return;
    el.removeAttribute('maxlength');
    el.removeEventListener('keydown', inputHandler);
  }
};
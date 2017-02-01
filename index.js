'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vanillaMasker = require('vanilla-masker');

var _vanillaMasker2 = _interopRequireDefault(_vanillaMasker);

var _isCharacterKeypress = require('./is-character-keypress');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputHandler = function inputHandler(ev) {
  var mask = ev.target.dataset.mask;
  var isCharacter = (0, _isCharacterKeypress.isCharacterKeyPress)(ev) && ev.keyCode !== 9;
  if (isCharacter && ev.target.value.length >= mask.length) {
    ev.preventDefault();
  }
  setTimeout(function () {
    ev.target.value = mask && mask.length > 0 ? _vanillaMasker2.default.toPattern(ev.target.value, mask) : ev.target.value;
  }, 0);
};

exports.default = {
  bind: function bind(el, binding) {
    console.log(binding.value.length);
    if (binding.value.length < 1) return;
    console.log('pulei o return');
    el.dataset.mask = binding.value;
    el.setAttribute('maxlength', el.dataset.mask.length);
    el.addEventListener('keydown', inputHandler);
  },
  unbind: function unbind(el) {
    if (binding.value.length < 1) return;
    el.removeAttribute('maxlength');
    el.removeEventListener('keydown', inputHandler);
  }
};
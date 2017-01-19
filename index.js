'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vanillaMasker = require('vanilla-masker');

var _vanillaMasker2 = _interopRequireDefault(_vanillaMasker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mask = {};

var inputHandler = function inputHandler(ev) {
  ev.target.value = mask ? _vanillaMasker2.default.toPattern(ev.target.value, mask) : ev.target.value;
};

exports.default = {
  bind: function bind(el, binding) {
    mask = binding.expression;
    el.addEventListener('input', inputHandler);
  },
  update: function update(el, binding) {
    mask = binding.expression;
  },
  unbind: function unbind(el) {
    el.addEventListener('input', inputHandler);
  }
};
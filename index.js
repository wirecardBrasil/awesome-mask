'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vanillaMasker = require('vanilla-masker');

var _vanillaMasker2 = _interopRequireDefault(_vanillaMasker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputHandler = function inputHandler(ev) {
  var mask = ev.target.dataset.mask;
  ev.target.value = mask ? _vanillaMasker2.default.toPattern(ev.target.value, mask) : ev.target.value;
};

exports.default = {
  bind: function bind(el, binding) {
    el.dataset.mask = binding.expression;
    el.setAttribute("maxlength", binding.expression.length);
    el.addEventListener('input', inputHandler);
  },
  unbind: function unbind(el) {
    el.removeAttribute("maxlength");
    el.removeEventListener('input', inputHandler);
  }
};
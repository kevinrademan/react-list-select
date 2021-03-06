'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.KEYS = exports.KEY = undefined;

var _values = require('lodash/object/values');

var _values2 = _interopRequireDefault(_values);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY = exports.KEY = {
	UP: 38,
	DOWN: 40,
	ESC: 27,
	ENTER: 13,
	SPACE: 32,
	J: 74,
	K: 75
};

var KEYS = exports.KEYS = (0, _values2.default)(KEY);
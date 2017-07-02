'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListItem = _react2.default.createClass({
	getDefaultProps: function getDefaultProps() {
		return {
			disabled: false,
			selected: false,
			focused: false
		};
	},
	render: function render() {
		var _this = this;

		var classes = (0, _classnames2.default)('react-list-select--item', {
			'is-disabled': this.props.disabled,
			'is-selected': this.props.selected,
			'is-focused': this.props.focused
		});

		return _react2.default.createElement(
			'li',
			{ className: classes,
				onMouseOver: function onMouseOver() {
					return _this.props.onMouseOver(_this.props.index);
				},
				onClick: function onClick(event) {
					return _this.props.onChange({ event: event, index: _this.props.index });
				} },
			this.props.children
		);
	}
});

exports.default = ListItem;
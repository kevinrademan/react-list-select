'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MakeList = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _map = require('lodash/collection/map');

var _map2 = _interopRequireDefault(_map);

var _includes = require('lodash/collection/includes');

var _includes2 = _interopRequireDefault(_includes);

var _isNumber = require('lodash/lang/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _min = require('lodash/collection/min');

var _min2 = _interopRequireDefault(_min);

var _max = require('lodash/collection/max');

var _max2 = _interopRequireDefault(_max);

var _range = require('lodash/utility/range');

var _range2 = _interopRequireDefault(_range);

var _remove = require('lodash/array/remove');

var _remove2 = _interopRequireDefault(_remove);

var _reject = require('lodash/collection/reject');

var _reject2 = _interopRequireDefault(_reject);

var _uniq = require('lodash/array/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _keys = require('./keys');

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MakeList = function MakeList() {
	var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    _ref$keyboardEvents = _ref.keyboardEvents,
	    keyboardEvents = _ref$keyboardEvents === undefined ? true : _ref$keyboardEvents;

	var List = _react2.default.createClass({
		getDefaultProps: function getDefaultProps() {
			return {
				items: [],
				selected: [],
				disabled: [],
				multiple: false,
				onChange: function onChange() {}
			};
		},
		getInitialState: function getInitialState() {
			return {
				items: this.props.items,
				selectedItems: this.props.selected,
				disabledItems: this.props.disabled,
				focusedIndex: null,
				lastSelected: null
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			this.setState({
				items: nextProps.items,
				selectedItems: nextProps.selected,
				disabledItems: nextProps.disabled
			});
		},
		clear: function clear() {
			this.setState({
				selected: [],
				disabled: [],
				focusedIndex: null,
				lastSelected: null
			});
		},
		select: function select() {
			var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
			    _ref2$index = _ref2.index,
			    index = _ref2$index === undefined ? null : _ref2$index,
			    _ref2$contiguous = _ref2.contiguous,
			    contiguous = _ref2$contiguous === undefined ? false : _ref2$contiguous;

			if ((0, _includes2.default)(this.state.disabledItems, index)) return;

			var multiple = this.props.multiple;
			var lastSelected = this.state.lastSelected;

			var selectedItems = multiple ? this.state.selectedItems.concat(index) : [index];

			if (contiguous && multiple && (0, _isNumber2.default)(lastSelected)) {
				var start = (0, _min2.default)([lastSelected, index]);
				var end = (0, _max2.default)([lastSelected, index]);

				selectedItems = (0, _uniq2.default)(selectedItems.concat((0, _range2.default)(start, end + 1)));
			}

			this.setState({ selectedItems: selectedItems, lastSelected: index });

			this.props.onChange(multiple ? selectedItems : index);
		},
		deselect: function deselect() {
			var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
			    _ref3$index = _ref3.index,
			    index = _ref3$index === undefined ? null : _ref3$index,
			    _ref3$contiguous = _ref3.contiguous,
			    contiguous = _ref3$contiguous === undefined ? false : _ref3$contiguous;

			var multiple = this.props.multiple;
			var _state = this.state,
			    selectedItems = _state.selectedItems,
			    lastSelected = _state.lastSelected;


			if (contiguous && multiple && (0, _isNumber2.default)(lastSelected)) {
				var start = (0, _min2.default)([lastSelected, index]);
				var end = (0, _max2.default)([lastSelected, index]);

				var toDeselect = (0, _range2.default)(start, end + 1);
				selectedItems = (0, _reject2.default)(selectedItems, function (idx) {
					return (0, _includes2.default)(toDeselect, idx);
				});
			} else {
				selectedItems = (0, _reject2.default)(selectedItems, function (idx) {
					return idx === index;
				});
			}

			this.setState({ selectedItems: selectedItems, lastSelected: index });
			this.props.onChange(this.props.multiple ? selectedItems : null);
		},
		enable: function enable(index) {
			var disabledItems = this.state.disabledItems;

			var indexOf = disabledItems.indexOf(index);

			disabledItems.splice(indexOf, 1);

			this.setState({ disabledItems: disabledItems });
		},
		disable: function disable(index) {
			this.setState({ disabledItems: this.state.disabledItems.concat(index) });
		},
		focusItem: function focusItem() {
			var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
			    _ref4$next = _ref4.next,
			    next = _ref4$next === undefined ? false : _ref4$next,
			    _ref4$previous = _ref4.previous,
			    previous = _ref4$previous === undefined ? false : _ref4$previous,
			    _ref4$index = _ref4.index,
			    index = _ref4$index === undefined ? null : _ref4$index;

			var _state2 = this.state,
			    focusedIndex = _state2.focusedIndex,
			    disabledItems = _state2.disabledItems;

			var lastItem = this.state.items.length - 1;

			if (next) {
				if (focusedIndex == null) {
					focusedIndex = 0;
				} else {
					// focus first item if reached last item in the list
					focusedIndex = focusedIndex >= lastItem ? 0 : focusedIndex + 1;
				}

				// skip disabled items
				if (disabledItems.length) {
					while ((0, _includes2.default)(disabledItems, focusedIndex)) {
						focusedIndex = focusedIndex >= lastItem ? 0 : focusedIndex + 1;
					}
				}
			} else if (previous) {
				if (focusedIndex == null) {
					focusedIndex = lastItem;
				} else {
					// focus last item if reached the top of the list
					focusedIndex = focusedIndex <= 0 ? lastItem : focusedIndex - 1;
				}

				// skip disabled items
				if (disabledItems.length) {
					while ((0, _includes2.default)(disabledItems, focusedIndex)) {
						focusedIndex = focusedIndex <= 0 ? lastItem : focusedIndex - 1;
					}
				}
			} else if (!(0, _includes2.default)(disabledItems, index) && (0, _isNumber2.default)(index)) {
				focusedIndex = index;
			}

			this.setState({ focusedIndex: focusedIndex });
		},
		onKeyDown: function onKeyDown(event) {
			var key = event.keyCode;

			if (key == _keys.KEY.UP || key == _keys.KEY.K) {
				this.focusItem({ previous: true });
			} else if (key == _keys.KEY.DOWN || key == _keys.KEY.J) {
				this.focusItem({ next: true });
			} else if (key == _keys.KEY.SPACE || key == _keys.KEY.ENTER) {
				this.toggleSelect({ event: event, index: this.state.focusedIndex });
			}

			// prevent default behavior, in some situations pressing the key
			// up / down would scroll the browser window
			if ((0, _includes2.default)(_keys.KEYS, key)) {
				event.preventDefault();
			}
		},
		toggleSelect: function toggleSelect() {
			var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
			    event = _ref5.event,
			    index = _ref5.index;

			event.preventDefault();
			var shift = event.shiftKey;

			if (!(0, _includes2.default)(this.state.selectedItems, index)) {
				this.select({ index: index, contiguous: shift });
			} else if (this.props.multiple) {
				this.deselect({ index: index, contiguous: shift });
			}
		},
		render: function render() {
			var _this = this;

			var items = (0, _map2.default)(this.props.items, function (itemContent, index) {
				var disabled = (0, _includes2.default)(_this.state.disabledItems, index);
				var selected = (0, _includes2.default)(_this.state.selectedItems, index);
				var focused = _this.state.focusedIndex === index;

				return _react2.default.createElement(
					_ListItem2.default,
					{ key: index,
						index: index,
						disabled: disabled,
						selected: selected,
						focused: focused,
						onMouseOver: function onMouseOver(index) {
							return _this.focusItem({ index: index });
						},
						onChange: _this.toggleSelect },
					itemContent
				);
			});

			return _react2.default.createElement(
				'ul',
				{ className: (0, _classnames2.default)('react-list-select', this.props.className),
					tabIndex: 0,
					onKeyDown: keyboardEvents && this.onKeyDown },
				items
			);
		}
	});
	return List;
}; // Thanks to https://gist.github.com/DelvarWorld/3784055
// for the inspiration for the shift-selection

exports.default = MakeList();
exports.MakeList = MakeList;
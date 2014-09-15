/* global define, document, requestAnimationFrame, app */
define([
	"react",
	"components/layout/Column",
	"components/layout/MapPanel"
], function (React, Column, MapPanel) {
	'use strict';

	function getDefaultState() {
		return {
			menuOpen: false
		};
	}

	return React.createClass({

		getInitialState: function () {
			return getDefaultState();
		},

		getDefaultProps: function () {
			return {
				menuId: 'LeftColumn',
				panelId: 'MapPanel',
				menuWidth: 320,
				fps: (1000 / 60),
				duration: 275,
				easing: {
					enabled: true,
					factor: 0.25
				}
			};
		},

		render: function () {
			return (
				React.DOM.div({'className': 'slide-menu' + (this.state.menuOpen ? ' open' : ' close')},
					new Column({
						'key': this.props.menuId,
						'description': this.props.description
					}),
					new MapPanel({
						'key': this.props.panelId,
						'options': this.props.options,
						'clickToggle': this._toggle
					})
				)
			);
		},

		_toggle: function () {
			if (this.state.menuOpen) {
				this._close();
			} else {
				this._open();
			}
		},

		_open: function () {
			var menuNode = document.getElementById(this.props.menuId),
					panelNode = document.getElementById(this.props.panelId),
					stepAmount = (this.props.fps / this.props.duration) * this.props.menuWidth,
					easingPoint = this.props.menuWidth - (this.props.menuWidth * this.props.easing.factor),
					endingPosition = this.props.menuWidth,
					useEasing = this.props.easing.enabled,
					easeAmount = stepAmount / 2,
					currentPosition = 0,
					self = this;

			function step() {
				// Get the next current position
				currentPosition += (useEasing && currentPosition > easingPoint) ? easeAmount : stepAmount;
				currentPosition = (currentPosition > endingPosition) ? endingPosition : currentPosition;

				// Increment to the correct position
				panelNode.style.left = currentPosition + 'px';
				menuNode.style.width = currentPosition + 'px';

				// If we have more to go, repeat, else exit
				if (currentPosition < endingPosition) {
					requestAnimationFrame(step);
				} else {
					self._updateMenuState();
					// Add any other necessary code here
					app.map.resize();
				}
			}

			requestAnimationFrame(step);

		},

		_close: function () {
			var menuNode = document.getElementById(this.props.menuId),
					panelNode = document.getElementById(this.props.panelId),
					stepAmount = (this.props.fps / this.props.duration) * this.props.menuWidth,
					easingPoint = this.props.menuWidth * this.props.easing.factor,					
					currentPosition = this.props.menuWidth,
					useEasing = this.props.easing.enabled,
					easeAmount = stepAmount / 2,
					endingPosition = 0;

			function step() {
				// Get the next current position
				currentPosition -= (useEasing && currentPosition < easingPoint) ? easeAmount : stepAmount;
				currentPosition = (currentPosition < endingPosition) ? endingPosition : currentPosition;
				
				// Increment to the correct position
				panelNode.style.left = currentPosition + 'px';
				menuNode.style.width = currentPosition + 'px';
				
				// If we have more to go, repeat, else exit
				if (currentPosition > endingPosition) {
					requestAnimationFrame(step);
				} else {
					// Add any other necessary code here
					app.map.resize();
				}
			}

			this._updateMenuState();
			requestAnimationFrame(step);

		},

		_updateMenuState: function () {
			this.setState({
				menuOpen: !this.state.menuOpen
			});
		}

	});

});
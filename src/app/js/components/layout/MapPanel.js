/* global define, app */
define([
	"react",
	"map/Controller"
], function (React, MapController) {
	'use strict';

	return React.createClass({

		componentDidMount: function () {
			// app is only variable in global namespace, attach map to it
			MapController.init(this.props.options);	
		},

		render: function () {
			return (
				React.DOM.div({'className': 'map-panel', 'id': this.props.id },
					React.DOM.div({'className': 'map', 'id': 'map'},
						React.DOM.div({'className': 'settings-icon', 'onClick': this.props.clickToggle })
					)
				)
			);
		}

	});

});
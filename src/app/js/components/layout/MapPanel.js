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
				React.DOM.div({'className': 'map-panel'},
					React.DOM.div({'className': 'map', 'id': 'map'},
						React.DOM.div({'id': 'Geocoder'})
					)
				)
			);
		}

	});

});
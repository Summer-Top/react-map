/* global define, app */
define([
	"react",
	"map/Map"
], function (React, Map) {
	'use strict';

	return React.createClass({

		componentDidMount: function () {
			// app is only variable in global namespace, attach map to it			
			app.map = new Map(this.props.options);
		},

		render: function () {
			return (
				React.DOM.div({'className': 'map-panel'},
					React.DOM.div({'className': 'map', 'id': 'map'})
				)
			);
		}

	});

});
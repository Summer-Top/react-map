/* global define */
define([
	"react"
], function (React) {
	'use strict';

	return React.createClass({

		render: function () {
			return (
				React.DOM.div({'className': 'column', 'id': this.props.id},
					React.DOM.div({'className': 'column-content'},
						React.DOM.div({'id': 'Geocoder'}),
						React.DOM.div({'className': 'app-description'}, this.props.description)
					)
				)
			);
		}

	});

});
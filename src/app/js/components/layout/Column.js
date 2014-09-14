/* global define */
define([
	"react"
], function (React) {
	'use strict';

	return React.createClass({

		render: function () {
			return (
				React.DOM.div({'className': 'column'},
					React.DOM.div({'className': 'column-content'},
						React.DOM.div({'className': 'app-description'}, this.props.description)
					)
				)
			);
		}

	});

});
/* global define */
define([
	"react"
], function (React) {
	'use strict';

	return React.createClass({

		render: function () {
			return (
				React.DOM.div({'className': 'header'},
					React.DOM.div({'className': 'title'}, 
						React.DOM.span(null, this.props.title)
					),
					React.DOM.div({'className': 'subtitle'}, 
						React.DOM.span(null, this.props.subtitle)
					)
				)
			);
		}

	});

});
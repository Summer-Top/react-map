/* global define */
define([
	"react",
	"components/layout/Column",
	"components/layout/MapPanel"
], function (React, Column, MapPanel) {
	'use strict';

	return React.createClass({

		render: function () {
			return (
				React.DOM.div({'className': 'body'},
					new Column({
						'description': this.props.description
					}),
					new MapPanel({
						'options': this.props.mapOptions
					})
				)
			);
		}

	});

});
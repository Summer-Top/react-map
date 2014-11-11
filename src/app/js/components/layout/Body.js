/* global define */
define([
	"react",
	"components/layout/SlideMenu"
], function (React, SlideMenu) {
	'use strict';

	return React.createClass({

		render: function () {
			return (
				React.DOM.div({'className': 'body'},
					new SlideMenu({
						'columnDescription': this.props.columnDescription,
						'options': this.props.mapOptions
					})
				)
			);
		}

	});

});
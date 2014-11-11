/* global define */
define([
	"react",
	"components/layout/Body",
	"components/layout/Header"
], function (React, Body, Header) {
	'use strict';

	return React.createClass({

		render: function () {
			return (
				React.DOM.div({'className': 'app'},
					new Header({
						'title': this.props.appTitle,
						'subtitle': this.props.appSubTitle
					}),
					new Body({
						'columnDescription': this.props.columnDescription,
						'mapOptions': this.props.mapOptions
					})
				)
			);
		}

	});

});
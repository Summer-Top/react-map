/* global define */
define([], function () {
	'use strict';
	/* Main App Configuration */

	return {

		"defaultProps": {
			"appTitle": "Example",
			"appSubTitle": "Testing React.js with Esri's ArcGIS JavaScript API.",
			"appDescription": "Description of the mapping application goes here and any images from AGOL account.",

			"mapOptions": {
				"sliderPosition": "top-left",
				"basemap": 'gray',
				"centerX": -97,
				"centerY": 39,
				"zoom": 4
			}
		},
		
		"corsEnabledServers": [
			"https://api-ssl.bitly.com"
		]

	};

});
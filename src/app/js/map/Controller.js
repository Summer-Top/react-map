/* global define, window, document, app */
define([
	"map/Map"
], function (Map) {
	'use strict';
	/* Main Controller for the Map */

	var _map;

	return {

		init: function (options) {
			if (app.map) {
				return;
			}
			// Set Esri Map Object into Global namespace for easy access after creation
			_map = new Map(options);
			app.map = _map.map;

			_map.on('ready', this.mapLoaded);

		},

		mapLoaded: function () {
			
		}

	};

});
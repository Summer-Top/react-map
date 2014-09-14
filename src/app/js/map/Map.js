/* global define */
define([
	"dojo/Evented",
	"dojo/_base/declare",
	// My Modules
	// Esri Modules
	"esri/map",
	// Esri Dijjits
], function (Evented, declare, Map) {
	'use strict';

	var _map = declare([Evented], {

		element: 'map',

		constructor: function (options) {
			declare.safeMixin(this, options);
			this.createMap();
		},

		createMap: function () {
			var self = this;

			self.map = new Map(this.element, {
				basemap: this.basemap,
				center: [this.centerX, this.centerY],
				sliderPosition: this.sliderPosition,
				zoom: this.zoom
			});

			self.map.on('load', function () {
				self.map.resize();
				self.emit('map-ready', {});
			});


		},

		mapLoaded: function () {
			
		},

		addWidgets: function () {

		},

		addLayers: function () {

		},

		addLayerError: function (err) {
			
		}

	});

	return _map;

});
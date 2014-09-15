/* global define */
define([
	"dojo/Evented",
	"dojo/_base/declare",
	// My Modules
	// Esri Modules
	"esri/map",
	// Esri Dijjits
	"esri/dijit/Geocoder"
], function (Evented, declare, Map, Geocoder) {
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
				self.mapLoaded();
				self.emit('ready', {});
			});

		},

		mapLoaded: function () {
			this.addWidgets();
		},

		addWidgets: function () {
			var self = this,
					geocoder;

			geocoder = new Geocoder({
				map: self.map,
				autoComplete: true,
      	arcgisGeocoder: {
      		placeholder: "Enter address or region"
      	}
			}, "Geocoder");
			geocoder.startup();

		},

		addLayers: function () {

		},

		addLayerError: function (err) {
			
		}

	});

	return _map;

});
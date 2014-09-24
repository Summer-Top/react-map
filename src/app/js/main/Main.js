/* global define, window, document */
define([
	"react",
	"main/config",
	"esri/config",
	"components/App"
], function (React, AppConfig, EsriConfig, App) {
	'use strict';
	/* Main App Launching Point */

	return {

		init: function () {
			window.app = {};
			this.applyConfigurations();
			this.launchApp();
		},

		applyConfigurations: function () {
			AppConfig.corsEnabledServers.forEach(function (server) {
				EsriConfig.defaults.io.corsEnabledServers.push(server);
			});
		},

		launchApp: function () {
			React.renderComponent(new App(AppConfig.defaultProps), document.getElementById("Application"));
		}

	};

});
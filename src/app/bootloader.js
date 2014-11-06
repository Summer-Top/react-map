/* global window, document, location */
(function (win, doc) {
	'use strict';
	var base = location.pathname.replace(/\/[^/]+$/, '') + 'app',
			appVersion = '1.0',
			esriVersion = '3.11',
			js = [
				'//js.arcgis.com/' + esriVersion + '/'
			],
			css = [
				'http://js.arcgis.com/' + esriVersion + '/esri/css/esri.css',
				'app/css/app.css' + '?' + appVersion
			],
			config = {
				parseOnLoad: false, 
	      isDebug: false, 
	      async: true,
	      cacheBust: "v=" + appVersion,
	      packages: [
	      	{name: "libs", location: base + "/libs"},
	      	{name: "map", location: base + "/js/map"},
	        {name: "main", location: base + "/js/main"},
	        {name: "utils", location: base + "/js/utils"},
	        {name: "store", location: base + "/js/store"},
	        {name: "dispatcher", location: base + "/js/dispatcher"},
	        {name: "components", location: base + "/js/components"}
	      ],
	      aliases: [
	      	['react', 'libs/react-0.12.0.min/index']
	      ],
	      deps: [
	      	"main/Main",
	      	"dojo/domReady!"
	      ],
	      callback: function (Main) {
	      	Main.init();
	      	// Before Running grunt build, remove main/Main from Require above and main parameter
	        // from callback, then uncomment below
	        // Release Version
	        // loadScript('app/js/app.min.js');
	      }
			};

	var loadScript = function (src) {
		var s = doc.createElement('script'),
				h = doc.getElementsByTagName('head')[0];
		s.src = src;
		s.async = true;
		h.appendChild(s);	
	};

	var loadStyle = function (src, isCDN) {
		var l = doc.createElement('link'),
				h = doc.getElementsByTagName('head')[0];

    l.rel = 'stylesheet';
    l.type = 'text/css';
    l.href = src;
    h.appendChild(l);
	};

	var launch = function () {
		// Load CSS
		for (var i = 0; i < css.length; i++) {
			loadStyle(css[i]);
		}
		// Setup Dojo Config
		win.dojoConfig = config;
		// Load JavaScript
		for (var j = 0; j < js.length; j++) {
			loadScript(js[j]);
		}
	};

	win.requestAnimationFrame = (function() {
  	return win.requestAnimationFrame ||
      win.webkitRequestAnimationFrame ||
      win.mozRequestAnimationFrame ||
      win.oRequestAnimationFrame ||
  		win.msRequestAnimationFrame;
  })();

  if (win.requestAnimationFrame) {
    win.requestAnimationFrame(launch);
  } else if (doc.readyState === "loaded") {
    launch();
  } else {
    win.onload = launch;
  }

})(window, document);
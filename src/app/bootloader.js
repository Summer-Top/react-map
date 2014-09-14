/* global window, document, location */
(function (win, doc) {
	'use strict';
	var version = "2.0.0", 
			URL = location.pathname.replace(/\/[^/]+$/, "") + 'app',
			dojoConfig = {
				parseOnLoad: false, 
	      isDebug: false, 
	      async: true,
	      cacheBust: "v=" + version,
	      packages: [
	      	{name: "libs", location: URL + "/libs"},
	      	{name: "map", location: URL + "/js/map"},
	        {name: "main", location: URL + "/js/main"},
	        {name: "utils", location: URL + "/js/utils"},
	        {name: "store", location: URL + "/js/store"},
	        {name: "dispatcher", location: URL + "/js/dispatcher"},
	        {name: "components", location: URL + "/js/components"}
	      ],
	      aliases: [
	      	['react', 'libs/react-0.11.1.min/index']
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
			}, // End dojoConfig
			src = 'http://js.arcgis.com/3.10/',
			css = [
				{ src: 'app/css/app.css', cdn: false },
				{ src: 'http://js.arcgis.com/3.10/js/esri/css/esri.css', cdn: true }
			];

	var loadScript = function (src, attrs) {
		var s = doc.createElement('script'),
			h = doc.getElementsByTagName('head')[0];
		s.src = src;
		s.async = true;
		for (var key in attrs) {
			if (attrs.hasOwnProperty(key)) {
				s.setAttribute(key, attrs[key]);
			}
		}
		h.appendChild(s);	
	};

	var loadStyle = function (src, isCDN) {
		var l = doc.createElement('link'),
			path = isCDN ? src : src + "?v=" + version,
			h = doc.getElementsByTagName('head')[0];
	    l.rel = "stylesheet";
	    l.type = 'text/css';
	    l.href = path;
	    l.media = "only x";
	    h.appendChild(l);
	    setTimeout(function () {
    		l.media = "all";
    	});
	};

	var loadDependencies = function () {
		win.dojoConfig = dojoConfig;
		loadScript(src);
		var i, length;
		for (i = 0, length = css.length; i < length; i++) {
			loadStyle(css[i].src, css[i].cdn);
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
      win.requestAnimationFrame(loadDependencies);
  } else if (doc.readyState === "loaded") {
      loadDependencies();
  } else {
      win.onload = loadDependencies;
  }

})(window, document);
module.exports = {
	del: 'build',
	htmlmin: {
		'src': 'src/**/*.html',
		'dest': 'build'
	},
	browserSync: {   
    // server: {
    //   baseDir: "src"
    // },
    proxy: "localhost",
    files: [
      'src/app/**/*.css',
      'src/app/**/*.js'
    ]
  },
	uglify: {
		'src': 'src/app/bootloader.js',
		'dest': 'build/app'
	},
	imagemin: {
		'src': 'src/app/**/*.{png,jpg,gif}',
		'dest': 'build/app'
	},
	copy: {
		'access': {'src': 'src/.htaccess', 'dest': 'build'},
		'libs': {'src': 'src/app/libs/*.js', 'dest': 'build/app/libs'}
	},
	stylus: {
		'watch': 'src/app/css/**/*.styl',
		'src': 'src/app/css/app.styl',
		'dest': 'build/app/css',
		'devOut': 'src/app/css'
	},
	requirejs: {
		options: {
      baseUrl: 'src',
      paths: {
        'dojo': 'empty:',
        'dijit': 'empty:',
        'dojox': 'empty:',
        'esri': 'empty:',
        'react': 'empty:',
        'libs': 'app/libs',
        'map': 'app/js/map',
        'main': 'app/js/main',
        'components': 'app/js/components'
      },
      // Name of the Entry File, minus the js
      name: 'entry/main-entry',
      out: 'build/app/js/app.min.js'
    }
	}
};
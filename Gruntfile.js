module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

    copy: {
      build: {
        files: [          
          { src: ['src/app/libs/es5-sham.min.js'], dest: 'build/app/libs/es5-sham.min.js', filter: 'isFile' },
          { src: ['src/app/libs/es5-shim.min.js'], dest: 'build/app/libs/es5-shim.min.js', filter: 'isFile' },
          { src: ['src/app/libs/html5shiv.js'], dest: 'build/app/libs/html5shiv.js', filter: 'isFile' },
          { src: ['src/.htaccess'], dest: 'build/.htaccess', filter: 'isFile' }
        ]
      }
    },

    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [
          { src:['src/index.html'], dest: 'build/index.html'},
          { expand: true, cwd: 'src/app', src: ['**/*.html'], dest: 'build/app' }
        ]
      }
    },

    uglify: {
      build: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd/") %> */',
          preserveComments: false
        },
        files: {
          'build/app/bootloader.js': 'src/app/bootloader.js'
        }
      }
    },

    imagemin: {
      build: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [
          { expand: true, cwd: 'src/app', src: ['**/*.{png,jpg,gif}'], dest: 'build/app' }
        ]
      }
    },

    stylus: {
      develop: {
        options: {
          compress: false,
          linenos: true
        },
        files: {
          'src/app/css/app.css': ['src/app/css/**/*.styl']
        }
      },
      build: {
        files: {
          'build/app/css/app.css': ['src/app/css/**/*.styl']
        }
      }
    },

    requirejs: {
      build: {
         options: {
          baseUrl: 'src',
          paths: {
            'dojo': 'empty:',
            'dijit': 'empty:',
            'dojox': 'empty:',
            'esri': 'empty:',
            'libs': 'app/libs',
            'map': 'app/js/map',
            'main': 'app/js/main',
            'utils': 'app/js/utils',
            'store': 'app/js/store',
            'dispatcher': 'app/js/dispatcher',
            'components': 'app/js/components',
            // Aliases            
            'react': 'app/libs/react-0.11.1.min/index'
          },
          name: 'build/requireConfig',
          out: 'build/app/js/app.min.js'
        }
      }
    },

    ftp_push: {
      build: {
        options: {
          host: '',
          dest: '',
          authKey: ''
        },
        files: [
          { expand: true, cwd: 'build', src: ['**'] }
        ]
      }
    },

    watch: {
      stylus: {
        options: {
          debounceDelay: 250,
          spawn: false
        },
        files: ['src/app/css/**/*.styl'],
        tasks: ['stylus:develop']
      }
    }

	});

	grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-ftp-push');

  grunt.registerTask('develop', ['watch:stylus']);
  grunt.registerTask('minify', ['copy:build','htmlmin:build','uglify:build','imagemin:build','stylus:build','requirejs:build']);

};
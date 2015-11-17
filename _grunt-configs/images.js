'use strict';

var _mozjpeg = require('imagemin-mozjpeg');
var _pngquant = require('imagemin-pngquant');
var _gifsicle = require('imagemin-gifsicle');

module.exports =  function (grunt, sharedConfig) {

	var _imageSrcDir = sharedConfig.srcDir + 'img/';
	var _imageDistDir = sharedConfig.distDir + 'img/';
	var _grunticonDirName = 'icons/';
	var _grunticonSrcDir = _imageSrcDir + _grunticonDirName;
	var _grunticonDistDir = _imageDistDir + 'icons/';
	var _favicon = 'favicon.ico';

	var _paths = {
		srcDir : _imageSrcDir,
        distDir : _imageDistDir,
        grunticonSrcDir : _grunticonSrcDir,
        grunticonDistDir : _grunticonDistDir,
        favicon : _favicon
	};

	var _config = {
		
		/**
		 * grunt-contrib-imagemin
		 * https://github.com/gruntjs/grunt-contrib-imagemin
		 * Minify PNG, SVG, gif & JPEG images
		 */
		imagemin: {
			grunticon: {
				options: {
					optimizationLevel: 3,
					progressive : true,
					svgoPlugins: [
						{ removeViewBox: false },
						{ removeUselessStrokeAndFill: false },
						// { cleanupIDs : true },
						// { removeUnknownsAndDefaults : true}
					],
					use: [
						_mozjpeg(),
						_pngquant(),
						_gifsicle()
					]
				},
				files: [{
					expand: true,
					cwd: _grunticonSrcDir,
					src: ['**/*.{svg,png,jpg,gif}'],
					dest: _grunticonDistDir
				}]
			},

			images: {
				files: [{
					expand: true,
					cwd: _imageSrcDir,
					src: ['**/*.{svg,png,jpg,gif}', '!' + _grunticonDirName + '**/*.*'],
					dest: _imageDistDir
				}]
			}
		},


		/**
		 * Grunticon
		 * https://github.com/filamentgroup/grunticon
		 */
		grunticon: {
			all: {
				files: [{
					expand: true,
					cwd   : _grunticonDistDir,
					src   : ['*.{svg,png,jpg,gif}'],
					dest  : _grunticonDistDir
				}],
				options: {
					// https://github.com/filamentgroup/grunticon#optionscustomselectors
					// customselectors: {
					// 	'play': ['.someCustomSelector', '.someOtherCustomSelector:after'],
					// }
				}
			}
		}
	};

	var _tasks = {
		compile : {
			images : {

				dev : [
					'imagemin:images'
				],
				
				dist : [
					'imagemin:images'
				]
			},

			icons : {

				dev : [
					'imagemin:grunticon',
					'grunticon'
				],
				
				dist : [
					'imagemin:grunticon',
					'grunticon'
				]
			}
		}
	};

	grunt.registerTask('images:dev', _tasks.compile.images.dev);
	grunt.registerTask('images:dist', _tasks.compile.images.dist);
    
    grunt.registerTask('icons:dev', _tasks.compile.icons.dev);
    grunt.registerTask('icons:dist', _tasks.compile.icons.dist);

	return {
		paths : _paths,
        config : _config,
        tasks : _tasks
    };
};

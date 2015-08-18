'use strict';

module.exports = function (grunt, sharedConfig) {

    var _utilities = require('./utilities')(grunt, sharedConfig);
    var _js = require('./javascript')(grunt, sharedConfig);
    var _css = require('./css')(grunt, sharedConfig);
    var _images = require('./images')(grunt, sharedConfig);
    var _markup = require('./markup')(grunt, sharedConfig);

    /**
    * Watch
    * https://github.com/gruntjs/grunt-contrib-watch
    * Watches your scss, js etc for changes and compiles them
    */
    var _config = {

        watch: {

            js : {
                files : [_js.paths.distDir + _js.paths.distFile],
                tasks : _js.tasks.compile.test
            },

            testJs : {
                files : [_js.paths.testBinDir + _js.paths.testSpecFile],
                tasks : _js.tasks.test.all
            },

            scss : {
                files : [_css.paths.srcDir + '**/*.scss'],
                tasks : _css.tasks.compile.dev,
                options: {
                    interrupt: true,
                    // spawn: false
                }
            },

            images : {
                files : [
                    _images.paths.srcDir + '**/*.{svg,png,jpg,gif}',
                    '!' + _images.paths.grunticonSrcDir + '**/*' // ignore the grunticon directory
                ],
                tasks : _images.tasks.compile.images.dev,
                options: {
                    interrupt: true
                }
            },

            markup : {
                files : [_markup.paths.srcDir + '**/*.html'],
                tasks : _utilities.tasks.copy.markup,

                options: {
                    livereload: true
                }
            },

            grunticon : {
                files : [
                    _images.paths.grunticonSrcDir + '**/*.{svg,png,jpg,gif}',
                    '_grunt-configs/images.js'
                ],
                tasks : _images.tasks.compile.icons.dev,
                options: {
                    interrupt: true
                }
            },

            grunt : {
                files : ['_grunt-configs/*.js', 'Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        }
    };

    return {
        config : _config
    };
};
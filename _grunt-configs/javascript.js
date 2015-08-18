'use strict';

var _alias = require('browserify-alias-grunt');

module.exports = function (grunt, sharedConfig) {

    var _srcDir = sharedConfig.srcDir + 'js/';
    var _distDir = sharedConfig.distDir + 'js/';
    var _srcFile = 'app.js';
    var _distFile = 'app.js';
    var _shimsDir = _srcDir + 'helpers/';
    var _shimsFile = 'shims.js';
    var _testDir = sharedConfig.testDir;
    var _testSpecDir = _testDir + 'spec/';
    var _testBinDir = _testDir + 'bin/';
    var _testSpecFile = 'test-spec-compiled.js';

    // build an object that is compatible with grunt-exorcise, as it doesn't seem to support
    // src and dest within its 'file' object.
    var _exorciseFileObjectTestAll = {};
    _exorciseFileObjectTestAll[_testBinDir + _testSpecFile + '.map'] = _testBinDir + _testSpecFile;

    var _browserifyAliasArray = _alias.map(grunt, {
        cwd : _srcDir,
        src : ['**/*.js', '!' + _srcFile],
        dest : ''
    });

    var _paths = {
        srcDir : _srcDir,
        distDir : _distDir,
        distFile : _distFile,
        testSpecDir : _testSpecDir,
        testBinDir : _testBinDir,
        testSpecFile : _testSpecFile
    };

    var _config = {

        browserify : {

            testAll: {
                src : _testSpecDir + '**/*.js',
                dest : _testBinDir + _testSpecFile,
                options : {
                    alias : _browserifyAliasArray,

                    browserifyOptions : {
                        debug: true
                    },

                    banner : 'require("source-map-support").install(); var expect = require("chai").expect;',

                    watch: true // use watchify instead of grunt-contrib-watch (much much faster!).
                }
            },

            dev: {
                src : _srcDir + _srcFile,
                dest : _distDir + _distFile,
                options : {
                    alias : _browserifyAliasArray,

                    browserifyOptions : {
                        debug: true
                    },

                    watch: true // use watchify instead of grunt-contrib-watch (much much faster!).
                }
            },

            dist: {
                src : _srcDir + _srcFile,
                dest : _distDir + _distFile,
                options : {
                    alias : _browserifyAliasArray,

                    browserifyOptions : {
                        debug: false
                    },
                }
            }
        },


        /**
         * Grunt Exorcise
         * https://github.com/mikefrey/grunt-exorcise
         * Move Browserify source maps to a separate file using Exorcist and Grunt.
         */
        exorcise: {
            testAll: {
                files: _exorciseFileObjectTestAll
            }
        },


        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            dev: {
                src : _distDir + _distFile,
                dest : _distDir + _distFile
            }
        },


        /**
         * Shimly
         * https://github.com/nicbell/shimly
         * Load in a base set of JS shims for use in a project
         */
        shimly : {
            // things you would like to shim (for a full list, see the shimly readme on Github)
            shim : ['Array.forEach', 'Array.filter', 'Array.map', 'Function.bind', 'EventListener', 'Element.classList'],

            // output location (relative to your grunt.js file location)
            dest : _shimsDir + _shimsFile,

            // minify the output (true or false)
            minify : false
        },

        simplemocha : {
            options: {
                timeout: 3000,
                ignoreLeaks: false,
            },

            testAll: {
                src: [_testBinDir + _testSpecFile]
            }
        }
    };

    var _tasks = {
        compile : {
            test : [
                'browserify:testAll',
                'exorcise:testAll'
            ],
            dev : [
                'browserify:dev'
            ],
            dist : [
                'browserify:dist',
                'uglify'
            ]
        },
        test : {
            all : ['simplemocha:testAll']
        }
    };

    grunt.registerTask('js:dev', _tasks.compile.dev.concat(_tasks.compile.test));
    grunt.registerTask('js:dist', _tasks.compile.dist.concat(_tasks.compile.test));
    grunt.registerTask('js:testAll', _tasks.test.all);

    return {
        paths : _paths,
        config : _config,
        tasks : _tasks
    };
};
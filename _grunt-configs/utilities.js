'use strict';

module.exports = function (grunt, sharedConfig) {

    var _images = require('./images')(grunt, sharedConfig);
    var _markup = require('./markup')(grunt, sharedConfig);

    var _config = {

        /**
         * Copy files
         * https://github.com/gruntjs/grunt-contrib-copy
         */
        copy : {
            markup : {
                files : [{
                    expand: true,
                    cwd: _markup.paths.srcDir,
                    src: ['**/*.html'],
                    dest: _markup.paths.distDir
                }]
            },
            favicon : {
                files : [{
                    expand: true,
                    cwd: _images.paths.srcDir,
                    src: [_images.paths.favicon],
                    dest: sharedConfig.distDir
                }]
            }
        },

        /**
         * Clean
         * https://github.com/gruntjs/grunt-contrib-clean
         * Clean some files
         */
        clean: {
            img : [_images.paths.distDir],
            markup : [_markup.paths.distDir],
            dist : [sharedConfig.distDir]
        }
    };

    var _tasks = {
        copy : {
            markup : ['copy:markup']
        }
    };

    return {
        config : _config,
        tasks : _tasks
    };
};
'use strict';

module.exports = function (grunt, sharedConfig) {

    var _paths = {
        baseDir : sharedConfig.distDir
    };

    var _config = {
        /**
         * browserSync
         * http://www.browsersync.io/docs/options/
         * http://www.browsersync.io/docs/grunt/
         */
        browserSync : {
            serve : {
                bsFiles : {
                    src : [
                        _paths.baseDir + '**/*.*'
                    ]
                },
                options : {
                    watchTask : true,
                    server : {
                        baseDir : _paths.baseDir
                    },
                    notify : false
                }
            }
        }
    };

    var _tasks = {};

    // grunt.registerTask('serve', _tasks.serve);

    return {
        paths : _paths,
        config : _config,
        tasks : _tasks
    };
};
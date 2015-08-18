'use strict';

module.exports =  function (grunt, sharedConfig) {

    var _srcDir = sharedConfig.srcDir + 'markup/';
    var _distDir = sharedConfig.distDir;

    var _paths = {
        srcDir : _srcDir,
        distDir : _distDir
    };

    var _config = {};

    var _tasks = {
    };

    return {
        paths : _paths,
        config : _config,
        tasks : _tasks
    };
};
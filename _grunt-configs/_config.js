'use strict';

var _ = require('underscore');

module.exports = function (grunt) {

    var _sharedConfig = {
        srcDir : 'src/',
        distDir : 'dist/',
        testDir : 'test/'
    };

    var _jsConfig = require('./javascript')(grunt, _sharedConfig).config;
    var _cssConfig = require('./css')(grunt, _sharedConfig).config;
    var _imageConfig = require('./images')(grunt, _sharedConfig).config;
    var _markupConfig = require('./markup')(grunt, _sharedConfig).config;
    var _watchConfig = require('./watch')(grunt, _sharedConfig).config;
    var _serverConfig = require('./server')(grunt, _sharedConfig).config;
    var _utilities = require('./utilities')(grunt, _sharedConfig).config;
    
    var _mergedConfig = _.extend(_sharedConfig, _jsConfig, _cssConfig, _imageConfig, _markupConfig, _watchConfig, _serverConfig, _utilities);

    return _mergedConfig;
};
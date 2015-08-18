module.exports = function (grunt) {

    'use strict';

    var _configs = require('./_grunt-configs/_config')(grunt);
    var _devTasks = ['clean:dist', 'shimly', 'js:dev', 'js:testAll', 'css:dev', 'images:dev', 'icons:dev', 'copy:markup'];
    var _serveTasks = _devTasks.concat(['browserSync:serve', 'watch']);
    var _distTasks = ['clean:dist', 'shimly', 'js:dist', 'js:testAll', 'css:dist', 'images:dist', 'icons:dist', 'copy:markup', 'copy:favicon'];

    // Project configuration.
    grunt.initConfig(_configs);

    grunt.registerTask('dev', _devTasks);
    grunt.registerTask('serve', _serveTasks);
    grunt.registerTask('dist', _distTasks);
    grunt.registerTask('default', _serveTasks);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*']});
};
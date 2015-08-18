'use strict';

module.exports =  function (grunt, sharedConfig) {

    var _srcDir = sharedConfig.srcDir + 'scss/';
    var _distDir = sharedConfig.distDir + 'css/';
    var _srcFile = 'kickoff.scss';
    var _distFile = 'app.css';
    var _autoprefixerBrowsers = ['> 5%', 'last 2 versions', 'firefox > 3.6', 'ie > 8'];

    var _paths = {
        srcDir : _srcDir,
        distDir : _distDir
    };

    var _config = {
        sass : {

            dev : {
                options : {
                    outputStyle : 'nested',
                    precision : 10,
                    sourceMap : true
                },
                src : _srcDir + _srcFile,
                dest : _distDir + _distFile
            },

            dist : {
                options : {
                    outputStyle : 'compressed',
                    precision : 10,
                    sourceMap : false
                },
                src : _srcDir + _srcFile,
                dest : _distDir + _distFile
            }
        },


        /**
         * Autoprefixer
         * https://github.com/nDmitry/grunt-autoprefixer
         * https://github.com/ai/autoprefixer
         * Auto prefixes your CSS using caniuse data
         */
        autoprefixer : {
            options : {
                browsers : _autoprefixerBrowsers,
                map : true,
                prev : false,
                inline : false
            },

            kickoff : {
                expand : true,
                flatten : true,
                src : _distDir + '*.css',
                dest : _distDir
            }
        },


        /**
         * CSSO
         * https://github.com/t32k/grunt-csso
         * Minify CSS files with CSSO
         */
        csso : {
            dist : {
                options : {
                    restructure: false // turns structural optimisations off as can mess up fallbacks http://bem.info/tools/optimizers/csso/description/
                },
                src : _distDir + _distFile,
                dest : _distDir + _distFile
            }
        }
    };

    var _tasks = {
        compile : {
            dev : [
                'sass:dev',
                'autoprefixer'
            ],

            dist : [
                'sass:dist',
                'autoprefixer',
                'csso:dist'
            ]
        }
    };

    grunt.registerTask('css:dev', _tasks.compile.dev);
    grunt.registerTask('css:dist', _tasks.compile.dist);

    return {
        paths : _paths,
        config : _config,
        tasks : _tasks
    };
};
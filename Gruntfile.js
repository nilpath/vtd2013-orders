'use strict';
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

/*global module:false*/
module.exports = function(grunt) {
  // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
    grunt.initConfig({
      // Task configuration.
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            test: {
                src: ['test/spec/*.js']
            },
            scripts: {
                src: ['scripts/*.js']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'scripts'),
                            mountFolder(connect, 'components'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            }
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        }
    });

    grunt.registerTask('test', [
        'connect:test',
        'mocha'
    ]);

    // Default task.
    grunt.registerTask('default', ['jshint', 'test']);

};

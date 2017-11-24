/**
 * Created by lequanghiep on 1/14/2017.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        app: {
            // Application variables
            scripts: [
                // JS files to be included by includeSource task into index.html
                'scripts/app/app.js',
                'scripts/app/app.constants.js',
                'scripts/**/*.js'
            ]
        },
        includeSource: {
            options: {
                basePath: 'src/main',
                baseUrl: '',
                ordering: 'top-down'
            },
            app: {
                files: {
                    'src/main/index.html': 'src/main/index.html'
                }
            }
        },
        wiredep: {
            task: {
                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                    'src/main/index.html'
                ],
                options: {
                    // See wiredep's configuration documentation for the options
                    // you may pass:

                    // https://github.com/taptapship/wiredep#configuration
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.registerTask('default', ['includeSource', 'wiredep']);
};
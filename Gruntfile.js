module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      files: [
        './src/**/*.js'
      ],
      tasks: ['default']
    },

    //  Code concatenation
    // ------------------------------------------------------------------------
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';',
        uglify: false
      },
      release: {
        // the files to concatenate
        src: [
          //'node_modules/es6-promise/dist/es6-promise.js',
          'js/util.js',
          'js/web_services.js'
        ],
        // the location of the resulting JS file
        dest: 'release/web_services.js'
      }
    },

    //  Code uglification
    // ------------------------------------------------------------------------
    uglify: {
      options: {
        compress: {
          drop_console: true
        },
        banner: "/*! js-webservices 0.5.0 | howerest 2016 - <davidvalin@howerest.com> | Apache 2.0 Licensed */\n"
      },
      release: {
        files: {
          'release/web_services.js': ['release/web_services.js']
        }
      }
    },

    //  Karma runner (BDD)
    // ------------------------------------------------------------------------
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', [/*'ts', */ 'concat', 'uglify']);
};

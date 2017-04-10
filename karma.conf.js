// Karma configuration
// Generated on Sun Apr 19 2015 02:03:27 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'karma-typescript'],

    // list of files / patterns to load in the browser
    files: [
      { pattern: 'node_modules/jasmine-ajax/lib/mock-ajax.js', included: true },
      { pattern: 'node_modules/babel-polyfill/dist/polyfill.js', included: true },

      { pattern: 'src/**/*.ts', included: true }
    ],

    preprocessors: {
      "src/**/*.ts" : ["karma-typescript"]
    },

    karmaTypescriptConfig: {
      tsconfig: "tsconfig.json"
    },

    // list of files to exclude
    exclude: [

    ],

    reporters: ['mocha', 'karma-typescript'],// , 'html'],
    // jasmine html report at: url/debug.html

    // web server port
    port: 9876,

    usePolling: true,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DISABLE,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};

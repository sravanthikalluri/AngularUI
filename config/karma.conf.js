module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: [ 'jasmine' ],
    files: [
      'assets/libs/jquery/jquery-2.1.4.min.js',
      'assets/libs/jquery/jquery-ui.min.js',
      'assets/libs/bootstrap/bootstrap.js',
      'assets/libs/jquery/jquery.gridder.js',
      'assets/libs/jquery/jquery-iframe-auto-height.min.js',
      'assets/libs/angular/angular.min.js',
      'assets/libs/angular/angular-mocks.js',
      'assets/libs/angular/angular-route.min.js',
      'assets/libs/angular/angular-resource.min.js',
      'assets/libs/angular/angular-sanitize.min.js',
      'assets/libs/angular/angular-cookies.min.js',
      'assets/libs/angulartics/angulartics.min.js',
      'assets/libs/angulartics-ga/angulartics-ga.min.js',
      'assets/libs/angular/angular-animate.min.js',
      'assets/libs/angular/angular-aria.min.js',
      'assets/libs/angular/angular-messages.min.js',
      'assets/libs/other/angular-bootstrap-select.js',
      'assets/libs/other/angular-material.min.js',
      'assets/libs/other/ui-bootstrap-tpls-0.13.0.js',
      'assets/libs/other/Chart.js',
      'assets/libs/other/tc-angular-chartjs.js',
      'assets/libs/other/ngDialog.min.js',
      'assets/libs/other/ngStorage.js',
      'assets/libs/other/select.js',
      'assets/libs/other/sortable.js',
      'assets/libs/other/ngDraggable.js',
      'assets/libs/other/ngMaskDirective.js',
      'assets/libs/other/angular-filter.js',
      'assets/libs/other/ng-tags-input.js',
      'assets/libs/other/v-accordion.js',
      'assets/libs/other/date.js',
      'assets/libs/other/d3Factory.js',
      'assets/libs/other/ng-infinite-scroll.min.js',
      'app/**/*.js',
      'app/**/*.html',
      //'dist/app.js',
      'tests/**/*.js'

    ],
    preprocessors: {
      /*'app/templates/!*.html': 'ng-html2js',*/
      'app/**/*.html': 'ng-html2js',
      'app/**/**.js': 'coverage'
      //'app/components/benefits/**/**.js': 'coverage'
    },
    ngHtml2JsPreprocessor: {
      // If your build process changes the path to your templates,
      // use stripPrefix and prependPrefix to adjust it.
      moduleName: "TrinetPassport"
    },

    reporters: [ 'progress', 'coverage', 'junit', 'threshold','html'],
    // the default configuration
    junitReporter: {
      outputDir: 'test-reports/junit', // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: ''

    },
    // the configure thresholds
    thresholdReporter: {
      statements: 3,
      branches: 0,
      functions: 0,
      lines: 3
    },
    coverageReporter: {
      // specify a common output directory
      dir: 'test-reports/coverage',
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        { type: 'cobertura', subdir: '.', file: 'cobertura.xml' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
      ]
    },
    htmlReporter: {
      outputFile: 'test-reports/html-reports.html'
    },
    colors: true,
    autoWatch: false,
    browsers: [ 'PhantomJS' ],
    singleRun: true,
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-coverage',
      'karma-junit-reporter',
      'karma-threshold-reporter',
      'karma-htmlfile-reporter'
    ]
  });
};
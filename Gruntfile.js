/*jslint node: true */
"use strict";

//var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;


module.exports = function (grunt) {

    var globalConfig = {
        src: 'src',
        dest: 'dist/assets',
        scssdir : 'assets',
        cssdir : 'assets',
        build_dir : 'build',
        dist_dir : 'dist'

    };
    var devservercfg = grunt.file.readJSON('devservercfg.json');

    grunt.initConfig({
        globalConfig: globalConfig,
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './libs',
                    cleanTargetDir: true
                }
            }
        },
        //Step 1: Compile SASS
        compass: {
            dev: {
                options: {
                    sassDir: '<%= globalConfig.scssdir  %>',
                    cssDir: '<%= globalConfig.cssdir %>',
                    environment: 'development',
                    outputStyle: 'expanded',
                    sourcemap: true,
                    noLineComments: true
                }

            },
            dist: {
                options: {
                    sassDir: '<%= globalConfig.scssdir  %>',
                    cssDir: '<%= globalConfig.dest %>',
                    environment: 'production',
                    outputStyle: 'compressed'
                }
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: false,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/assets/css-min',
                    ext: '.min.css'
                }]
            }
        },

        'string-replace': {
            disableAngularDebugInfo: {
                options: {
                    replacements: [
                        {
                            pattern: '$compileProvider.debugInfoEnabled(true);',
                            replacement: '$compileProvider.debugInfoEnabled(false);'
                        }
                    ]
                },
                src: 'app/app.js',
                dest: 'app/app.js'
            },
            enableAngularDebugInfo: {
                options: {
                    replacements: [
                        {
                            pattern: '$compileProvider.debugInfoEnabled(false);',
                            replacement: '$compileProvider.debugInfoEnabled(true);'
                        }
                    ]
                },
                src: 'app/app.js',
                dest: 'app/app.js'
            },
            enableAllTests: {
                options: {
                    replacements: [
                        {
                            pattern: "//'tests/**/**.js'",
                            replacement: "'tests/**/**.js'"
                        }
                    ]
                },
                src: 'config/karma.conf.js',
                dest: 'config/karma.conf.js'
            }
        },

        // copy: {
        //     main: {
        //         expand: true,
        //         //cwd: 'app/',
        //         src: ['index.html', 'app/**', 'assets/libs/**', '!js/**', '!lib/**', '!**/*.css'],
        //         dest: 'dist/'
        //     },
        //     shims: {
        //         expand: true,
        //         cwd: 'app/lib/webshim/shims',
        //         src: ['**'],
        //         dest: 'dist/js/shims'
        //     }
        // },


        clean: ['dist', '.tmp'],

        copy: {
            indexbak: {
                src: ['index.html'],
                dest: 'dist/bk/index.html'
            },
            assets: {
                src: ['assets/**'],
                dest: 'dist/'
            },
           /* shared: {
                src: ['app/shared/config/env.json'],
                dest: 'dist/app/shared/config/env.json'
            },*/
            useminindex : {
                src: ['index.html'],
                dest: 'dist/index.html'
            },
            indexrep: {
                src: ['dist/bk/index.html'],
                dest: 'index.html'
            }
        },

        html2js: {
            options: {
                base: '',
                module: 'TrinetPassport.templates',
                singleModule: true,
                useStrict: true,
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            main: {
                src: ['app/**/*.html'],
                dest: 'app/templates.js'
            }
        },


        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist',
                flow: {
                    steps: {
                        js: ['concat'],
                        css: ['concat', 'cssmin']
                    },
                    post: {}
                }

            }
        },

        usemin: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }

        },

        // rev: {
        //     files: {
        //         src: ['dist/**/*.{js,css}', '!dist/js/shims/**']
        //     }
        // },




        jshint: {
            options:{
                jshintrc: '.jshintrc',
                verbose: true,
                force: true
            },
            all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js' ]
        },

        connect: {
            'static': {
                options: {
                    hostname: 'greenstack.hrpassport.com',
                    port: 8011

                }
            },
            server: {
                options: {
                    hostname: 'greenstack.hrpassport.com',
                    base : '.',
                    port: 8012,
                    keepalive: true,
                    middleware: function (connect, options, defaultMiddleware) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [
                            // Include the proxy first
                            proxy
                        ].concat(defaultMiddleware);
                    }

                },
                proxies: [
                    {
                        context: '/api',
                        host: 'platformbib.hrpassport.com',
			port: 443,
			https: true
                    },
                    {
                        context: '/trinetGateway',
                        host: 'platformbib.hrpassport.com',
                        port: 443,
                        https: true
                    },
                    {
                        context: '/trinetgateway',
                        host: 'platformbib.hrpassport.com',
                        port: 443,
                        https: true
                    },
                    {
                        context: '/trinetAuth',
                        host: 'platformbib.hrpassport.com',
                        port: 443,
                        https: true
                    },
                    {
                        context: '/microservices-config',
                        host: 'platformbib.hrpassport.com',
                        port: 443,
                        https: true
                    }
                ]
            }
        },

        compress: {
            dist: {
                options: {
                    archive: '<%= globalConfig.build_dir %>/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{
                    expand : true,
                    cwd: '<%= globalConfig.dist_dir %>/',
                    //src: [ '*.html', 'assets/**/*', 'app/**/*' ],
                    src: ['**'],
                    dest: '/'
                }]
            }
        },

        karma: {
            options: {
                configFile: 'config/karma.conf.js'
            },
            unit: {
                singleRun: true
            },

            continuous: {
                singleRun: false,
                autoWatch: true
            }
        },


        war: {
            target: {
                options: {
                    war_dist_folder: '<%= globalConfig.build_dir %>',
                    war_name: 'ui-portal',
                    webxml_welcome: 'home.html',
                    webxml_display_name: 'Green Stack Portal',
                    webxml_filename : 'web.xml',
                    webxml_mime_mapping: [
                        {
                            extension: 'woff',
                            mime_type: 'application/font-woff'
                        }
                    ],
                    webxml : function (opts) {
                        var webxml =  '<?xml version="1.0" encoding="UTF-8"?>' +
                            '<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                            'xmlns="http://java.sun.com/xml/ns/javaee" ' +
                            'xmlns:web="http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" ' +
                            'xsi:schemaLocation="http://java.sun.com/xml/ns/javaee ' +
                            'http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" ' +
                            ' id="WebApp_ID" version="3.0">' +
                            '<display-name>' + opts.war_name + '</display-name>' +
                            '<welcome-file-list>' +
                            '<welcome-file>index.html</welcome-file>' +
                            '</welcome-file-list>' +
                            '<filter>'+
                            '<filter-name>Agent</filter-name>'+
                            '<filter-class>com.sun.identity.agents.filter.AmAgentFilter</filter-class>'+
                            '</filter>'+
                            '<filter-mapping>'+
                            '<filter-name>Agent</filter-name>'+
                            '<url-pattern>/*</url-pattern>'+
                            '<dispatcher>REQUEST</dispatcher>'+
                            '<dispatcher>INCLUDE</dispatcher>'+
                            '<dispatcher>FORWARD</dispatcher>'+
                            '<dispatcher>ERROR</dispatcher>'+
                            '</filter-mapping>'+
                            '</web-app>';
                        return webxml;

                    },

                    // add a weblogic.xml
                    war_extras : [
                        { filename: 'WEB-INF/weblogic.xml', data : function (opts) {
                            var weblogicxml =
                                '<?xml version="1.0" encoding="UTF-8"?>' +
                                '<wls:weblogic-web-app xmlns:wls="http://xmlns.oracle.com/weblogic/weblogic-web-app" ' +
                                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                                'xsi:schemaLocation="http://java.sun.com/xml/ns/javaee ' +
                                'http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd ' +
                                'http://xmlns.oracle.com/weblogic/weblogic-web-app ' +
                                'http://xmlns.oracle.com/weblogic/weblogic-web-app/1.4/weblogic-web-app.xsd">' +
                                '<wls:weblogic-version>12.1.1</wls:weblogic-version>' +
                                '<wls:context-root>ui/apps/'+ opts.war_name +'</wls:context-root>' +
                                '</wls:weblogic-web-app>';
                            return weblogicxml;

                        }
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= globalConfig.dist_dir %>',
                        //src: [ '*.html', 'assets/**/*', 'app/**/*' ],
                        src: ['**/*'],
                        dest: ''
                    }
                ]
            }
        },

        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'app/**/*.js', '**/*.html', 'tests/*.js', 'config/*' ],
                tasks: [ 'string-replace:enableAngularDebugInfo', 'force:karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp' ],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
                tasks: [ 'jshint', 'force:karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist' ],
                options: {
                    atBegin: true
                }
            },
            assets: {
                files: [
                    '**/*.html',
                    '**/*.scss'
                ],
                tasks: [
                    'html2js:main',
                    'compass:dev'
                ],
                options: {
                    atBegin: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-force-task');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-war');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-string-replace');


    /*grunt.registerTask('get-dev-cookie', function () {
        var configFilePath = "app/shared/config/env.json";

        if (!grunt.file.exists(configFilePath)) {
            grunt.log.error("file " + configFilePath + " not found");
            return true;//return false to abort the execution
        }

        var configFile = grunt.file.readJSON(configFilePath);//get file as json object
        configFile.envCookie = devservercfg.devEnvCookie;
        grunt.file.write(configFilePath, JSON.stringify(configFile, null, 2));

    });

    grunt.registerTask('get-local-cookie', function () {
        var configFilePath = "app/shared/config/env.json";

        if (!grunt.file.exists(configFilePath)) {
            grunt.log.error("file " + configFilePath + " not found");
            return true;//return false to abort the execution
        }

        var configFile = grunt.file.readJSON(configFilePath);//get file as json object
        configFile.envCookie = devservercfg.localEnvCookie;
        grunt.file.write(configFilePath, JSON.stringify(configFile, null, 2));

    });*/



    //grunt.registerTask('sass-prod', ['compass:prod']);
    grunt.registerTask('server', ['connect:static', 'configureProxies:server', 'connect:server', 'watch:dev']);
    grunt.registerTask('fakeServer', ['connect:static', 'configureProxies:fakeServer', 'connect:fakeServer', 'watch:dev']);
    grunt.registerTask('dev', [ 'bower', 'server', 'watch:dev' ]);
    grunt.registerTask('static', [ 'watch:assets' ]);
    grunt.registerTask('test', [ 'bower', 'jshint', 'string-replace:enableAngularDebugInfo', 'karma:continuous' ]);
    grunt.registerTask('minified', [ 'bower', 'connect:server', 'watch:min' ]);
    grunt.registerTask('build-local-war', [ 'bower', 'jshint', /*'force:karma:unit',*/ 'html2js:dist', 'concat:dist', 'uglify:dist',
        'clean:temp', 'get-local-cookie','compress:dist', 'war' ]);
    // grunt.registerTask('build-dev-war', [ 'bower', 'jshint', 'force:karma:unit', /*'html2js:dist', 'concat:dist', 'uglify:dist',
    //     'clean:temp',*/ 'get-dev-cookie', /*'compress:dist',*/ 'war' ]);
    // grunt.registerTask('build-prod-war', [ 'bower', 'jshint', 'force:karma:unit', 'html2js:dist', 'concat:dist', 'uglify:dist',
    //     'clean:temp', 'compress:dist', 'war' ]);
    // build local war file with some concatenated files
    grunt.registerTask('build-local-war', [
        'clean',
        'bower',
        'jshint',
        'html2js:main',
        'force:karma:unit',
        //'get-local-cookie',
        'copy:indexbak',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'usemin',
        'copy:assets',
        //'copy:shared',
        'copy:useminindex',
        'copy:indexrep',
        'war',
        'compress:dist'
    ]);
    // build production war file with some concatenated files
    grunt.registerTask('build-dev-war', [
        'clean',
        'bower',
        'jshint',
        'html2js:main',
        'force:karma:unit',
        //'get-dev-cookie',
        'copy:indexbak',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        //'uglify:generated',
        'usemin',
        'copy:assets',
        //'copy:shared',
        'copy:useminindex',
        'copy:indexrep',
        'war',
        'compress:dist'

    ]);
    // build production war file with some concatenated files
    grunt.registerTask('build-prod-war', [
        'clean',
        'bower',
        'jshint',
        'html2js:main',
        'string-replace:enableAngularDebugInfo',
        'string-replace:enableAllTests',
        'force:karma:unit',
        'string-replace:disableAngularDebugInfo',
        //'get-dev-cookie',
        'copy:indexbak',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        //'uglify:generated',
        'usemin',
        'copy:assets',
        //'copy:shared',
        'copy:useminindex',
        'copy:indexrep',
        'war',
        'compress:dist'

    ]);


    // make sure versioning is final task
    grunt.registerTask('default', 'server');


};

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['public/client/**/*.js'],
        dest: 'dist/built.js',
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },



    uglify: {
      my_target: {
        files: {
          'dist/built.min.js': ['dist/built.js']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        'app/**/*.js',
        'dist/**/*.js',
        'lib/**/*.js',
        'public/client/**/*.js',
        'tests/**/*.js',
        '*.js'
      ]
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/style.min.css': ['public/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        // git add .
        // git commit -m 'push to production {timestamp}'
        // git push live master
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [ 
    'nodemon',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'nodemon', 
    'mochaTest', 
    'eslint', 
    'concat', 
    'uglify', 
    'cssmin'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run(['build']);
      grunt.task.run(['upload']);
    } else {
      grunt.task.run(['build']);
    }
  });
};

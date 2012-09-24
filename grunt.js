module.exports = function(grunt) {

  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'tasks/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },

    clean: ['tmp'],

    steal: {
      js: 'lib',
      build: ['../test/fixtures/build.js', {
        src: '../test/fixtures/build.js',
        to: '../foo'
      }]
    },

    concat: {
      dist: {
        src: ['test/fixtures/concat/a.js', 'test/fixtures/concat/b.js'],
        dest: 'tmp/concat.js'
      }
    },

    nodeunit: {
      tasks: ['test/*_test.js']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.renameTask('test', 'nodeunit');
  grunt.registerTask('test', 'clean steal concat nodeunit');

  // Default task.
  grunt.registerTask('default', 'lint test');
};
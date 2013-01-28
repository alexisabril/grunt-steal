module.exports = function(grunt) {
  grunt.registerTask('steal', 'Build your application with StealJS', function() {
    this.requiresConfig('steal');

    var steal = grunt.config('steal'),
    done = this.async(),
    promise = require('promised-io/promise'),

    build = steal.build && steal.build.length ? steal.build : [],
    js = require('os').platform() === 'win32' ? 'js.bat' : './js',

    gruntDir = process.cwd(),
    instances = [],

    runSteal = function(args) {
      var deferred = new promise.Deferred();
      grunt.log.writeln('\nRunning: ' + js + ' ' + args.join(' '));

      grunt.util.spawn({
        cmd: js,
        args: args
      }, function(e, result, code) {
        if(code) {
          deferred.reject(e);
        }
        else {
          grunt.log.write(result.stdout);
          deferred.resolve();
        }
      });

      return deferred.promise;
    };

    process.chdir(steal.js || '.');

    var execute = function(i) {
      var opts = typeof build[i] === 'string' ? {
        src: build[i]
      } : build[i],
      args = [];

      args.push(opts.src);
      delete opts.src;

      for(var name in opts) {
        if(opts[name]) {
          args.push('-' + name);

          if(typeof opts[name] !== 'boolean') {
            args.push(opts[name]);
          }
        }
      }

      var deferred = runSteal(args);

      deferred.then(function() {
        if(i < build.length - 1) {
          execute(++i);
        }
        else {
          process.chdir(gruntDir);

          grunt.log.ok();
          done();
        }
      }, function(e) {
        grunt.log.writeln('\n');
        grunt.log.error(e.stdout);

        done(false);
      });
    };

    execute(0);
  });
};

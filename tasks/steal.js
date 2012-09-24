module.exports = function(grunt) {
  grunt.registerTask('steal', 'Build your application with StealJS', function() {
    this.requiresConfig('steal');

    var steal = grunt.config('steal'),
    exec = require('exec-sync'),
    os = require('os'),
    build = steal.build && steal.build.length ? steal.build : [],
    cmd = os.platform() === 'win32' ? 'js.bat ' : './js ';

    process.chdir(steal.js || '.');

    for(var i = 0; i < build.length; i++) {
      var opts = typeof build[i] === 'string' ? {
        src: build[i]
      } : build[i];
      cmd += opts.src + ' ';
      delete opts.src;

      for(var name in opts) {
        if(opts[name]) {
          cmd += '-' + name + ' ';
          cmd += typeof opts[name] !== 'boolean' ? opts[name] + ' ' : '';
        }
      }
      cmd = cmd.trim();

      grunt.log.writeln('\nRunning: ' + cmd);

      var stdout = exec(cmd);
      grunt.log.write(stdout);
    }
  });
};
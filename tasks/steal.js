module.exports = function(grunt) {
  grunt.registerTask('steal', 'Build your application with StealJS', function() {
    this.requiresConfig('steal');
    var steal = grunt.config('steal'),
    exec = require('exec-sync'),
    os = require('os'),
    build = steal.build && steal.build.length ? steal.build : [],
    js = os.platform() === 'win32' ? 'js.bat ' : './js ';

    process.chdir(steal.js || '.');

    for(var i = 0; i < build.length; i++) {
      var opts = typeof build[i] === 'string'
        ? { src: build[i] }
        : build[i],
      cmd = js + build[i].src;

      if(!build[i].compress) {
        cmd += ' -nocompress';
      }

      grunt.log.writeln('Running: ' + cmd);

      var stdout = exec(cmd);
      grunt.log.ok([stdout]);
    }
  });
};
load('steal/rhino/rhino.js');

steal('steal/build','steal/build/scripts','steal/build/styles', function() {
	steal.build('../test/fixtures/index.html', {
		to: '../tmp',
		compressor: 'uglify'
	});
});
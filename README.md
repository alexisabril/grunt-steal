# grunt-steal

[![Build Status](https://secure.travis-ci.org/alexisabril/grunt-steal.png)](http://travis-ci.org/alexisabril/grunt-steal)

# NOTICE

**grunt-steal has been forked and will be maintained from https://github.com/bitovi/grunt-steal going forward. This version is the current version on NPM, however upon the next StealJS release, Bitovi's fork will take over(slated early 2014).**

**I'm currently leaving this version for JMVC users 3.2 and prior, however migrating issues to the new project.**

**- Alexis Abril, Dec 9, 2013**

A task to allow for ease of running multiple [StealJS](http://javascriptmvc.com/docs.html#!stealjs "StealJS") build scripts.

Currently, this assumes you have steal as a subdirectory/submodule placed in the root of your UI project and configured via `steal/js steal/make.js`.

## Getting Started

Install this plugin with: `npm install grunt-steal`

Then add this line to your project's `grunt.js` file:

	grunt.loadNpmTasks('grunt-steal');

### Overview

Specify a `steal` section in your gruntfile. This will allow configurations for overriding options in the specified build scripts.

### Parameters

#### js `string`

Optional - Specify a path to the steal root. Defaults to gruntfile directory.

#### build `array`

Specify all build scripts via string or object. *See example below*

### Sample config

The configuration below specifies the steal root, where the `js` runner exists, then runs each build script.

	steal: {
		js: 'path/to/steal/root',
		build: ['path/to/build.js', 'path/to/app2/build.js']
	}

You can also provide override options for your prebuilt build scripts.

	steal: {
		build: [{
			src: 'path/to/build.js',
			to: 'some/new/dir',
			compressor: 'uglify'
		}]
	}

*Note: The src and other path options are relative to the `steal` root, not the gruntfile*

*Note: option overrides are in an alpha release of StealJS*

These will override the options specified within the build script.

'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-browserify-skeleton:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        projectName: this.appname,
        author: 'Awesome Author'
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'README.md',
      'package.json',
      '.eslintrc',
      'gulpfile.js',
      '.gitignore',
      'src/index.html',
      'src/js/app.js'
    ]);
  });
});

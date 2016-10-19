'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the impeccable ' + chalk.red('generator-browserify-skeleton') + ' generator!'
    ));

    var prompts = [{
        type: 'input',
        name: 'autor',
        message: 'Autors name?'
      },{
      type: 'input',
      name: 'projectName',
      message: 'Your project name?',
      default: this.appname
      }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.autor = props.autor;
      this.projectName = props.projectName;
    }.bind(this));
  },

  makeDirs: function () {
    this.mkdir('dist');
    this.mkdir('src/js/components');
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    ),
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        autor: this.autor,
        projectName: this.projectName,
      }
    ),
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    ),
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    ),
    this.fs.copy(
      this.templatePath('src/js/app.js'),
      this.destinationPath('src/js/app.js')
    ),
    this.fs.copy(
      this.templatePath('src/index.html'),
      this.destinationPath('src/index.html')
    )

  },

  install: function () {
    this.installDependencies();
  }
});

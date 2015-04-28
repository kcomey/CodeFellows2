module.exports = function(grunt) {

  grunt.initConfig({

  jshint: {
    all: {
      options: {
        node: true,
        simplemocha: true
      },
    },
    // define the files to lint
    files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
  },

  simplemocha: {
     src: 'src/**/*.js'
  },

  watch: {
    files: ['test/**/*.js','src/**/*.js'],
    tasks: ['jshint', 'simplemocha']
  }
});

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-simple-mocha');

grunt.registerTask('default', ['jshint']);
grunt.registerTask('test', ['simplemocha']);

};

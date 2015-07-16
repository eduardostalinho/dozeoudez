module.exports = function(grunt) {
  grunt.initConfig({
    webfont: {
      icons: {
        'src': 'www/icons/*.svg',
        'dest': 'www/fonts',
        'destCss': 'www/css/',
      }
    }
  });
  grunt.loadNpmTasks('grunt-webfont');
}

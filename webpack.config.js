const path = require('path');

module.exports = (env, argv) => {
  return {
    entry: './src/tweak.js',
    output: {
      filename: argv.mode === 'production' ? 'tweak.min.js' : 'tweak.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
};

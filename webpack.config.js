const path = require('path');

module.exports = {
  entry: {
    main: './js/script.js',
    burger: './js/burger.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/', // Путь, по которому будут обращаться скрипты в браузере
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './'), // Указываем корневую директорию
    },
    port: 8080, // Любой порт, который вам удобен
  },
};

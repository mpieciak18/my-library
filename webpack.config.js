const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    optimization: {
        minimize: false
    },
    publicPath: '/library/'
};
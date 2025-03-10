const path = require('path'); // path - package build in the Node.js

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'assets', 'scripts'),
        publicPath: 'assets/scripts/'
    },
    devServer: {
        contentBase: '.'
    }
};
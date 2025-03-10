const path = require('path'); // path - package build in the Node.js
const CleanPlugin = requite('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'assets', 'scripts'),
        publicPath: 'assets/scripts/'
    },
    devtool: 'cheap-module-eval-source-map',
    // devServer: {
    //     contentBase: './'
    // }
};
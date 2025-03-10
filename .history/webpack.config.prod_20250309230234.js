const path = require("path"); // path - package build in the Node.js
const CleanPlugin = requite("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/app.js",
  output: {
    filename: "[contenthas].js",
    path: path.resolve(__dirname, "assets", "scripts"),
    publicPath: "assets/scripts/",
  },
  devtool: "cheap-source-map",
  // devServer: {
  //     contentBase: './'
  // }
  plugins: [new CleanPlugin.CleanWebpackPlugin()
]
};

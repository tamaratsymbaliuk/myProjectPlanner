const path = require("path"); // path - package build in the Node.js

module.exports = {
  mode: "production",
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "assets", "scripts"),
    publicPath: "assets/scripts/",
  },
  devtool: "cheap-source-map",
  // devServer: {
  //     contentBase: './'
  // }
};

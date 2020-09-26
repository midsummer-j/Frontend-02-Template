module.exports = {
  // entry: './animation-demo.js',
  entry: './main.js',
  devServer: {
    contentBase: '../',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-react-jsx", { pragma: "createElement" }]]
          }
        }
      }
    ]
  },
  mode: "development"
};
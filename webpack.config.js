module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'main.js'
  },
  module: {
    loaders: [
      { 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        
      }
    ]
  },
  watch:true
}
const path = require('path');

module.exports = {
  entry: './src/index.js', // Adjust entry point as per your project
  output: {
    path: path.resolve(__dirname, 'dist'), // Adjust output directory as per your project
    filename: 'bundle.js', // Adjust output filename as per your project
  },
  module: {
    rules: [
        {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-react'],
                },
            },
        },
        {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
            presets: ['@babel/preset-react'], // Presets for React
            },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve('./dist'),
        filename: 'scripts/bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/}
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}


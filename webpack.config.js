const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.js',
    // devtool: 'inline-source-map',
    output: {
        filename: 'app.js',
        // path: path.resolve(__dirname, 'dist')
        path: path.resolve('public')
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['@babel/react']
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'app.css'
        })
    ],
    watchOptions: {
        ignored: ['public/**', 'node_modules/**'],
        poll: 1000,
        aggregateTimeout: 600
    }
}
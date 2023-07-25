const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    devServer: {
        historyApiFallback: true,
    },
    entry: { index: path.resolve(__dirname, 'src', 'index.js') },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: ['babel-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/', // Cambia el directorio de salida si lo deseas
                    },
                },
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public'),
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new Dotenv(),
    ],
};
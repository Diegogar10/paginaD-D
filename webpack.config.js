const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const plugins = [
    new HtmlWebpackPlugin({
        inject: true,
        template:'index.html',
        filename:'./index.html'
    }), 
    new MiniCssExtractPlugin(
        {
            filename: 'assets/[name][contenthash].css'
        }
    ),
    new CopyPlugin({
        patterns: [
            {
                from: path.resolve(__dirname,"src","assets/icons"),
                to: "assets/icons"
            },
            {
                from: path.resolve(__dirname,"src","assets/images"),
                to: "assets/images"
            }
        ]
    }, 
    ), 
];
const shouldAnalize = process.argv.includes('--analyze');

shouldAnalize ?
    plugins.push(
        new BundleAnalyzerPlugin(
            {
                analyzerPort:5050
            }
        )
    )
    : plugins;

module.exports = {
    entry: './src/assets/index.js',
    output: {
        path: path.resolve(__dirname,'docs'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        extensions: ['.js'] 
    },
    module: 
    {
        rules:[
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test:/\.png$/,
            },
            {
                test: /\.s?css$/i,
                use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
                ],
            },
        ] 
    },
    plugins,
    optimization: {
        minimize: true, 
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ],
    }
}
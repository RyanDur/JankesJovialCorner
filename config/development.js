const {common} = require('./common');
const {merge, configCSS, loadImages} = require('@ryandur/webpack-configs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCSSAssetsPlugin = require('postcss-assets-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const mqpacker = require('mqpacker');
const cssnano = require('cssnano');
const webpack = require("webpack");

exports.development = (paths) => merge([common(paths), {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        host: process.env.HOST,
        port: process.env.PORT,
        overlay: true,
        historyApiFallback: true,
        hotOnly: true
    },
    stats: 'minimal',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
},
    {
        module: {
            rules: [{
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader', options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: (loader) => [
                                require('postcss-preset-env')({
                                    stage: 3,
                                    features: {
                                        'nesting-rules': true
                                    }
                                }),
                                require('postcss-initial')(),
                                require('postcss-autoreset')(),
                                require('postcss-url')(),
                                require('postcss-advanced-variables')({
                                    disable: '@if, @else, @for, @each'
                                }),
                                require('postcss-import')({root: loader.resourcePath}),
                                require("postcss-modules-extend-rule/pre"),
                                require('doiuse')({
                                    browsers: ['last 2 versions', 'ie >=9', 'Android >= 4'],
                                    ignore: ['rem', 'css-boxshadow', 'css-transitions']
                                }),
                                cssnano
                            ]
                        }
                    }
                ],
                exclude: /node_modules/,
                include: /src/
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[id].[contenthash].css',
            }),
            new PostCSSAssetsPlugin({
                test: /\.css$/,
                log: true,
                plugins: [
                    mqpacker,
                    cssnano,
                    require("postcss-modules-extend-rule/post")
                ],
            }),
            new StyleLintPlugin(),
        ]
    },
    loadImages()
]);

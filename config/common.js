const HtmlWebpackPlugin = require('html-webpack-plugin');
const {merge, loadJS} = require('@ryandur/webpack-configs');

exports.common = ({dist}) => merge([{
    target: 'web',
    output: {
        chunkFilename: '[name].[chunkhash:4].js',
        filename: '[name].[chunkhash:4].js',
        path: dist
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Janke\'s Jovial Corner',
            scriptLoading: 'defer',
            meta: {
                viewport: [
                    'width=device-width',
                    'user-scalable=no',
                    'initial-scale=1.0',
                    'maximum-scale=1.0',
                    'minimum-scale=1.0',
                    'shrink-to-fit=no'
                ].join(',')
            },
            template: 'index.html'
        })
    ]
}, {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: ["source-map-loader", {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }, {
                    enforce: "pre",
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader",
                },]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.jsx', '.js', '.mjs']
    },
}]);

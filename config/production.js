const {common} = require('./common');
const {merge, configCSS, loadImages} = require('@ryandur/webpack-configs');

exports.production = (paths) => merge([common(paths), {
    mode: 'production',
    devtool: 'source-map',
    plugins: []
},
    configCSS({sourceMap: true, devMode: false}),
    loadImages({
        options: {
            limit: 15000,
            name: "[name].[ext]",
        },
    })
]);

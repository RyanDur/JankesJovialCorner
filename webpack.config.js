const {development, production} = require('./config'),
    PATHS = {dist: require('path').resolve(__dirname, 'dist')};

module.exports = mode => mode === 'prod' ? production(PATHS) : development(PATHS);

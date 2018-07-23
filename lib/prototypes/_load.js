let _proto = {};

require('fs').readdirSync(__dirname).forEach(file => {
    if (file[0] !== '_') {
        _proto[file] = require('./' + file);
    }
});

module.exports = _proto;
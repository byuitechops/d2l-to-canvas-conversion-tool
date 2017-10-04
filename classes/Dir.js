/*eslint-env node, es6*/

var path = require('path');

module.exports = class Dir {
    constructor(pathIn, files, dirs) {
        this.path = pathIn;
        this.name = path.parse(pathIn).name;
        this.files = files;
        this.dirs = dirs;
    }
};

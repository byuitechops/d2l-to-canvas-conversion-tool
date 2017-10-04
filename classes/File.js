/*eslint-env node, es6*/
var path = require('path');

module.exports = class File {
    constructor(pathIn, guts, isText) {
        var parsedPath = path.parse(pathIn);
        this.name = parsedPath.name + parsedPath.ext;
        this.path = pathIn;
        this.ext = parsedPath.ext;
        this.dom = guts;
        this.isTextFile = isText;
    }
};

module.exports = class File {
  constructor(name, path, ext, dom, binary) {
    this.name = name;
    this.path = path;
    this.ext = ext;
    this.dom = dom;
    this.isBinary = binary;
  }
};

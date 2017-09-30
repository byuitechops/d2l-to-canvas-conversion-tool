module.exports = class File {
  constructor(name, path, ext, guts, doc) {
    this.name = name;
    this.guts = guts;
    this.doc = doc;
  }
};

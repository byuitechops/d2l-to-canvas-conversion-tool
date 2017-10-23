module.exports = class ReportModule {
  constructor(name) {
    this.name = name;
    this.fatalErrs = [];
    this.errors = [];
    this.changes = [];
    this.warnings = [];
  }
};

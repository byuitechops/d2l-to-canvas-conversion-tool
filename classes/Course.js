const ReportModule = require('./ReportModule.js');
const path = require('path');

module.exports = class Course {
  constructor(filePath, settings) {
    this.report = [
      new ReportModule('main'),
      new ReportModule('indexer')
    ];
    this.settings = {
      'debug': settings.debug,
      'readAll': settings.readAll,
      'platform': settings.platform
    };
    this.info = {
      'originalFilepath': path.resolve(filePath),
      'unzippedFilepath': path.resolve('D2LProcessing'),
      'zippedFilepath': path.resolve('D2LReady'),
      'fileName': filePath.split('/')[filePath.split('/').length - 1]
    };
    this.content = {};
  }

  findReportModule(reportModule) {
    return reportModule.name === this.toString();
  }

  /* Adds fatal errors to report for given module */
  throwFatalErr(moduleName, err) {
    var index = this.report.findIndex(this.findReportModule, moduleName);
    if (index < 0) {
      console.log(`Report Module was not found: ${moduleName}`);
    } else {
      this.report[index].fatalErrs.push(err);
    }
  }

  /* Adds non-fatal errors to report for given module */
  throwErr(moduleName, err) {
    var index = this.report.findIndex(this.findReportModule, moduleName);
    if (index < 0) {
      console.log(`Report Module was not found: ${moduleName}`);
    } else {
      this.report[index].errors.push(err);
    }
  }

  /* Adds successful changes to report for given module */
  success(moduleName, message) {
    var index = this.report.findIndex(this.findReportModule, moduleName);
    if (index < 0) {
      console.log(`Report Module was not found: ${moduleName}`);
    } else {
      console.log(`${moduleName}: ${message}`);
      this.report[index].changes.push(message);
    }
  }

  /* Adds new "junk drawer" item to info */
  newInfo(propertyName, value) {
    this.info[propertyName] = value;
  }

  /* Creates a new Report Module */
  addModuleReport(moduleName) {
    var index = this.report.findIndex(this.findReportModule, moduleName);
    if (index > 0) {
      console.log(`Report Module already created: ${moduleName}`);
    } else {
      this.report.push(new ReportModule(moduleName));
    }
  }

  // REWRITE AS SEARCH FUNCTION

  /* This will check for properties provided in the propertyArray parameter */
  verifyProperty(propertyName) {
    /* Check if object contains user-input property in INFO */
    if (Object.keys(courseObj.info).includes(propertyName)) {
      return courseObj.info[propertyName];
    }
    /* Check if object contains user-input property in SETTINGS */
    if (Object.keys(courseObj.settings).includes(propertyName)) {
      return true;
    }
    return false;
  }
};

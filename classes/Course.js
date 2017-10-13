const ReportModule = require('./ReportModule.js');
const path = require('path');
const chalk = require('chalk');

module.exports = class Course {
    constructor(filePath, settings) {
        this.report = [
            new ReportModule('main'),
            new ReportModule('preparation'),
            new ReportModule('verifier')
        ];
        this.settings = {
            'debug': settings.debug,
            'readAll': settings.readAll,
            'online': settings.online,
            'keepFiles': settings.keepFiles
        };
        this.info = {
            'originalFilepath': path.resolve(filePath),
            'unzippedFilepath': path.resolve('D2LProcessing'),
            'altUnzippedFilepath': path.resolve('D2LProcessed'),
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
            console.log(chalk.red(`--- Report Module was not found: ${chalk.redBright(moduleName)}`));
        } else {
            console.log(`--- ${chalk.bgRed(' FATALERROR ')} ${chalk.redBright(moduleName)}: ${chalk.red(err)}`);
            this.report[index].fatalErrs.push(err);
        }
    }

    /* Adds non-fatal errors to report for given module */
    throwErr(moduleName, err) {
        var index = this.report.findIndex(this.findReportModule, moduleName);
        if (index < 0) {
            console.log(chalk.red(`--- Report Module was not found: ${chalk.redBright(moduleName)}`));
        } else {
            console.log(`--- ${chalk.redBright(moduleName)}: ${chalk.red(err)}`);
            this.report[index].errors.push(err);
        }
    }

    /* Adds successful changes to report for given module */
    success(moduleName, message) {
        var index = this.report.findIndex(this.findReportModule, moduleName);
        if (index < 0) {
            console.log(chalk.red(`Report Module was not found: ${chalk.redBright(moduleName)}`));
        } else {
            if (this.settings.debug) {
                console.log(`--- ${chalk.greenBright(moduleName)}: ${chalk.white(message)}`);
            }
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
            console.log(chalk.red(`Report Module already created: ${chalk.redBright(moduleName)}`));
        } else {
            this.report.push(new ReportModule(moduleName));
            this.success(moduleName, 'Report Module successfully created.');
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

    getFilesByType(extension, callback) {
        var newArr = this.content.filter(file => file.ext === extension);
        callback(newArr);
    }

    getFilesByName(string, callback) {
        var newArr = this.content.filter(file => file.name.includes(string));
        callback(newArr);
    }

    // Use this for CSS Selectors as well?
    searchFileContent(query, callback) {
        var newArr = this.content.filter(file => file.dom.toString().includes(query));
        callback(newArr);
    }

    // find
    // SEARCH
    // find by selector?
    // find by filetype?
    // find by file name?
    // find by...?
};

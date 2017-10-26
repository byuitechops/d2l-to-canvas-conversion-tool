/*eslint-env node, es6*/
/*eslint no-console:1*/
/*global courseObj*/

const ReportModule = require('./ReportModule.js');
const path = require('path');
const chalk = require('chalk');
const fws = require('fixed-width-string');

module.exports = class Course {
    constructor(filePath, settings) {
        this.report = [
            new ReportModule('main'),
            new ReportModule('preparation'),
            new ReportModule('verifier'),
            new ReportModule('misc')
        ];
        this.settings = {
            'debug': settings.debug,
            'readAll': settings.readAll,
            'online': settings.online,
            'keepFiles': settings.keepFiles,
            'deleteCourse': settings.deleteCourse
        };
        this.info = {
            'originalFilepath': path.resolve('D2LOriginal', filePath),
            'unzippedFilepath': path.resolve('D2LProcessing'),
            'altUnzippedFilepath': path.resolve('D2LProcessed'),
            'zippedFilepath': path.resolve('D2LReady'),
            'fileName': filePath.split(path.sep)[filePath.split(path.sep).length - 1]
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
            this.throwErr('misc', `Report Module was not found: ${moduleName}`);
        } else {
            console.log(
                fws(chalk.cyan(moduleName), 15),
                fws(chalk.bgRed('FATALERR'), 8, { align: 'right'}),
                chalk.red(err)
            );
            this.report[index].fatalErrs.push(err);
        }
    }

    /* Adds non-fatal errors to report for given module */
    throwErr(moduleName, err) {
        var index = this.report.findIndex(this.findReportModule, moduleName);
        if (index < 0) {
            this.throwErr('misc', `Report Module was not found: ${moduleName}`);
        } else {
            console.log(
                fws(chalk.cyan(moduleName), 15),
                fws(chalk.redBright('ERROR'), 8, { align: 'right'}),
                chalk.red(err)
            );
            this.report[index].errors.push(err);
        }
    }

    /* Adds warnings to report for given module */
    throwWarning(moduleName, warning) {
        var index = this.report.findIndex(this.findReportModule, moduleName);
        if (index < 0) {
            this.throwErr('misc', `Report Module was not found: ${moduleName}`);
        } else {
            console.log(
                fws(chalk.cyan(moduleName), 15),
                fws(chalk.yellow('WARNING'), 8, { align: 'right'}),
                chalk.yellowBright(warning)
            );
            this.report[index].warnings.push(warning);
        }
    }

    /* Adds successful changes to report for given module */
    success(moduleName, message) {
        var index = this.report.findIndex(this.findReportModule, moduleName);
        if (index < 0) {
            this.throwErr('misc', `Report Module was not found: ${moduleName}`);
        } else {
            if (this.settings.debug) {
                console.log(
                    fws(chalk.cyan(moduleName), 15),
                    fws(chalk.greenBright('SUCCESS'), 8, { align: 'right'}),
                    chalk.white(message)
                );
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
            this.throwErr('misc', `Report Module already created: ${moduleName}`);
        } else {
            this.report.push(new ReportModule(moduleName));
            console.log(
                fws(chalk.cyan(moduleName), 15),
                fws(chalk.blueBright('LAUNCHED'), 8, { align: 'right'})
            );
            this.success(moduleName, 'Report Module successfully created.');
        }
    }

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

    /* Returns files of the given extension */
    getFilesByType(extension, callback) {
        var newArr = this.content.filter(file => file.ext === extension);
        if (newArr.length < 1) {
            callback('No files found by extension in course content.');
        } else {
            callback(null, newArr);
        }
    }

    /* Returns files with the given string within their name */
    getFilesByName(string, callback) {
        var newArr = this.content.filter(file => file.name.includes(string));
        if (newArr.length < 1) {
            callback('No files found by filename in course content.');
        } else {
            callback(null, newArr);
        }
    }

    getFileName(fileName, callback) {
        var file = this.content.find(fileMember => fileMember.name === fileName);
        if (file) {
            callback(null, file);
        } else {
            callback('Filename not found in course content.');
        }
    }
};

#! /usr/bin/env node
/*eslint-env node, es6*/
/*eslint no-console:0*/

const main = require('./main');
const chalk = require('chalk');
const fws = require('fixed-width-string');
const fs = require('fs');

const argv = require('yargs').argv;
    

var settings = {
    'debug': argv.d || argv.D || argv.debug ? argv.d : false,
    'readAll': argv.a || argv.A || argv.all ? argv.a : false,
    'online': argv.o || argv.O || argv.online ? true : false,
    'keepFiles': argv.k || argv.K || argv.keep ? true : false,
    'deleteCourse': argv.x || argv.X || argv.delete ? true : false
};

main(settings, (err, finalCourse) => {
    if (err) {
        console.log(err);
    }
    finalCourse.report.forEach((ReportModule) => {
      console.log(chalk.yellowBright(`\nModule Report: ${chalk.yellow(ReportModule.name)}\n`));
      console.log(fws(`Errors`, 20, {padding: '.'}) + chalk.red(ReportModule.errors.length));
      console.log(fws(`Fatal Errors`, 20, {padding: '.'}) + chalk.red(ReportModule.fatalErrs.length));
      console.log(fws(`Successes`, 20, {padding: '.'}) + chalk.greenBright(ReportModule.changes.length));
    });
    fs.writeFile('./report.json', JSON.stringify(finalCourse.report), err => {
        if (err){
            console.log(chalk.red('Error writing report to report.json'));
        }
        console.log('\nFinal report written to report.json');
    });
});

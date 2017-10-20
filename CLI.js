/*eslint-env node, es6*/
/*eslint no-console:0*/
const argv = require('yargs')
    .choices(['debug', 'all', 'delete', 'keep' ,'online'])
    .option('debug', {
        alias: 'd',
        describe: 'Consoles all successes and errors.',
    })
    .option('all', {
        alias: 'a',
        describe: 'Reads in all course zips in current working directory.',
    })
    .option('delete', {
        alias: 'x',
        describe: 'Deletes the created Canvas course after the process finishes.',
    })
    .option('keep', {
        alias: 'k',
        describe: 'Keeps all files created in the process.',
    })
    .option('online', {
        alias: 'o',
        describe: 'Determines behavior of the process to account for online course standards.',
    })
    .argv;
const main = require('./main');
const chalk = require('chalk');
const fws = require('fixed-width-string');
const fs = require('fs');

console.log(argv);

var settings = {
    'debug': argv.D ? argv.D : false,
    'readAll': argv.A ? argv.A : false,
    'online': argv.O ? true : false,
    'keepFiles': argv.K ? true : false,
    'deleteCourse': argv.X ? true : false
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

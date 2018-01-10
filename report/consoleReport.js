const fs = require('fs');
const chalk = require('chalk');
const fws = require('fixed-width-string');

module.exports = (courseObj, callback) => {
    console.log(`\nNew Canvas Course: https://byui.instructure.com/courses/${courseObj.info.canvasOU}`);
    console.log('\n' + chalk.bgBlue(' FINAL REPORT '));

    console.log(
        fws(chalk.cyanBright('MODULE'), 13),
        fws(chalk.yellow('WARNINGS'), 10, { align: 'right' }),
        fws(chalk.red('ERRORS'), 10, { align: 'right' }),
        fws(chalk.redBright('FATALERRS'), 10, { align: 'right' }),
        fws(chalk.greenBright('SUCCESSES'), 10, { align: 'right' })
    );

    courseObj.report.forEach(report => {
        if (report) {
            console.log(
                fws(chalk.cyan(report.name), 13),
                fws(chalk.yellow(report.warnings.length), 10, { align: 'right' }),
                fws(chalk.red(report.errors.length), 10, { align: 'right' }),
                fws(chalk.redBright(report.fatalErrs.length), 10, { align: 'right' }),
                fws(chalk.greenBright(report.changes.length), 10, { align: 'right' })
            );
        }
    });

    fs.writeFile(`./report${courseObj.info.fileName.split('.zip')[0]}.json`, JSON.stringify(courseObj.report), err => {
        if (err) {
            console.log(chalk.red('Error writing report to report.json'));
            callback(err);
        } else {
            console.log('\nFinal report written to report.json');
            callback(null);
        }
    });
}
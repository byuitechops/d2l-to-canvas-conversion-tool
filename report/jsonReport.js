const chalk = require('chalk');
const fs = require('fs');

module.exports = (course, callback) => {
    fs.writeFile(`./reports/report${course.info.fileName.split('.zip')[0]}.json`, JSON.stringify(course.report), err => {
        if (err) {
            console.log(chalk.red('Error writing report to report.json'));
            callback(err);
        } else {
            console.log('\nFinal report written to report.json');
            callback(null);
        }
    });
}
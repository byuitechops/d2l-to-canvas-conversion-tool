const templates = require('./templates.js');
const fs = require('fs');
const chalk = require('chalk');

module.exports = (course, stepCallback) => {

    var report = `<table>`;

    /* Get our template */
    var $ = templates.main;
    /* Retrieve all categories */
    var categories = course.logs.map(log => log.title);
    /* Unique the categories */
    categories = [...new Set(categories)];
    /* For each category... */
    categories.forEach(category => {
        /* Get the logs for the category */
        var logs = course.logs.filter(log => log.title === category);
        /* Get the headers for the table */
        var headers = logs.map(log => Object.keys(log.data));
        headers = [...new Set(headers)];

        report += `<table>`;
        report += `<tr>`;
        headers.forEach(header => {
            report += `<th>${header}</th>`;
        });
        report += `</tr>`;
        logs.forEach(log => {
            report += `<tr>`;
            Object.values(log.data).forEach(value => {
                report += `<td>${value}</td>`;
            });
            report += `</tr>`;
        });
    });

    fs.writeFile(`./reports/report${course.info.fileName.split('.zip')[0]}.html`, report, err => {
        if (err) {
            console.log(chalk.red('Error writing report to report.html'));
            stepCallback(err, course);
        } else {
            console.log('HTML report written to report.html');
            stepCallback(null, course);
        }
    });
}
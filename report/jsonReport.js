const fs = require('fs');

module.exports = (course, callback) => {

    fs.writeFile(`./reports/report${course.info.fileName.split('.zip')[0]}.json`, JSON.stringify(course.logs), err => {
        if (err) {
            course.error(err);
            callback(err);
        } else {
            console.log('\nFinal JSON report written to report.json');
            callback(null);
        }
    });
}
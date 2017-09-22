/*eslint-env node*/
/*eslint no-console:0*/
'use-strict';

const request = require('request'),
    auth = require('../auth.json');


/******************************************
 * uses the canvas API to get all migration
 * issues from the given migration
 ******************************************/
module.exports = function (course, stepCallback) {
    console.log("getMigrationIssues");
    try {

        var url = "https://byui.instructure.com/api/v1/courses/" + course.info.canvasOU + "/content_migrations/" + course.info.migrationID + "/migration_issues";

        request.get(url, function (err, response, body) {
            if (err) {
                throw err;
            }

            body = JSON.parse(body);
            //console.log("statusCode:", response.statusCode);
            //console.log('migrationIssues:', JSON.stringify(body, null, 3));

            course.info.migrationIssues = body;

            course.report.moduleLogs['importCourse'].changes.push('Migration issues successfully retrieved');
            stepCallback(null, course);

        }).auth(null, null, true, auth.token);
    } catch (e) {
        e.location = "getMigrationIssues";
        stepCallback(e, course);
    }
}

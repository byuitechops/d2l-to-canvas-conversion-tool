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
    try {

        var url = "https://byui.instructure.com/api/v1/courses/" + course.info.canvasOU + "/content_migrations/" + course.info.migrationID + "/migration_issues";

        request.get(url, function (err, response, body) {
            if (err) {
                stepCallback(new Error('getMigrationIssues'), course);
                return;
            }

            body = JSON.parse(body);
            //console.log("statusCode:", response.statusCode);
            //console.log('migrationIssues:', JSON.stringify(body, null, 3));

            //FIX THIS
            course.info.migrationIssues.concat(body);

            course.report.moduleLogs['getMigrationIssues'].changes.push('Migration issues successfully retrieved');
            stepCallback(null, course);

        }).auth(null, null, true, auth.token);
    } catch (e) {
        stepCallback(new Error('getMigrationIssues'), course);
    }
}

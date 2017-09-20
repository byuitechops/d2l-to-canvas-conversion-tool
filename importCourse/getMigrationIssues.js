/*eslint-env node*/
/*eslint no-console:0*/
'use-strict';

const variables = require('../variables.js'),
    request = require('request'),
    auth = require('../auth.json');


/******************************************
* uses the canvas API to get all migration
* issues from the given migration
******************************************/
module.exports = function (returnCallback) {
    var url = "https://byui.instructure.com/api/v1/courses/" + variables.getCourseId() + "/content_migrations/" + variables.getMigrationId() + "/migration_issues";

    request.get(url, function (err, response, body) {
        if (err) {
            returnCallback(err);
            return;
        }

        body = JSON.parse(body);
        //console.log("statusCode:", response.statusCode);
        //console.log('migrationIssues:', JSON.stringify(body, null, 3));
        
        //FIX THIS
        //variables.setMigrationIssues(body);
        returnCallback();

    }).auth(null, null, true, auth.token);
}
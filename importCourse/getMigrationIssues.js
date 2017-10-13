/*eslint-env node, es6*/
/*eslint no-console:0*/
'use-strict';

const request = require('request'),
  auth = require('../auth.json');

/********************************************
 * uses the canvas API to GET all migration
 * issues and save them to the course object
 ********************************************/
module.exports = function (course, stepCallback) {
  console.log("getMigrationIssues");
  course.addModuleReport("getMigrationIssues");

  var url = "https://byui.instructure.com/api/v1/courses/" + course.info.canvasOU + "/content_migrations/" + course.info.migrationID + "/migration_issues";

  request.get(url, function (err, response, body) {
    if (err) {
      course.throwFatalErr("getMigrationIssues", err);
      stepCallback(err, course);
      return;
    }
    body = JSON.parse(body);
    //console.log("statusCode:", response.statusCode);
    //console.log('migrationIssues:', JSON.stringify(body, null, 3));

    //course.info.migrationIssues = body;
    //course.report.moduleLogs['importCourse'].changes.push('Migration issues successfully retrieved');
    course.newInfo('migrationIssues', body);
    course.success('getMigrationIssues', 'Migration issues successfully retrieved');

    stepCallback(null, course);

  }).auth(null, null, true, auth.token);
}

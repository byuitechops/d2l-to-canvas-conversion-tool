/*eslint-env node, es6*/
/*eslint no-console:0*/

/* Put dependencies here */
const request = require('request'),
  auth = require('../auth.json');


/**************************************
 * creates a new course in canvas
 * saves canvasOU to the course object
 **************************************/
module.exports = (course, stepCallback) => {
  course.addModuleReport("createCourse");

  var courseName = course.info.fileName.match(/\w+/)[0];
  var courseCode = course.info.fileName.match(/\d+/)[0];

  request.post({
    url: "https://byui.instructure.com/api/v1/accounts/1/courses",
    form: {
      'course[name]': courseName,
      'course[course_code]': courseCode,
      'course[license]': "public_domain",
      'course[is_public_to_auth_users]': "true"
    }
  }, function (err, response, body) {
    if (err) {
      course.throwFatalErr("createCourse", err);
      stepCallback(err, course);
      return;
    } else {
      //console.log(chalk.green(courseName + " Successfully created"));
      //console.log('Course Number: ', body.id);
      body = JSON.parse(body);

      //course.info.canvasOU = body.id;
      course.newInfo('canvasOU', body.id);

      //course.report.moduleLogs['importCourse'].changes.push('Course successfully created in Canvas');
      course.success("createCourse", "Course successfully created in Canvas");
      stepCallback(null, course);
    }
  }).auth(null, null, true, auth.token);
};

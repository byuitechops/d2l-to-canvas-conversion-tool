/*eslint-env node*/
/*eslint no-console:0*/
'use-strict';


/* Put dependencies here */

module.exports = (course, stepCallback) => {
    console.log('createCourse');
    try {
        /* Code Body */

        /*******************************
         * creates a new course in canvas
         * sets courseId in variables
         *********************************/
        var request = require('request'),
            auth = require('../auth.json'),
            chalk = require('chalk');

        var courseName = course.info.courseName.match(/\w+/)[0];
        var courseCode = course.info.courseName.match(/\d+/)[0];

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
                stepCallback(new Error('importCourse'), course);
                return;
            } else {
                //console.log(chalk.green(courseName + " Successfully created"));
                //console.log('Course Number: ', body.id);
                body = JSON.parse(body);
                
                //save course id to course object
                course.info.canvasOU = body.id;
                
                // save progress to reports object
                course.report.moduleLogs['importCourse']
                    .changes.push('Course successfully created in Canvas');
                // return to step module
                console.log("calling sterpCallback");
                stepCallback(null, course);
            }
        }).auth(null, null, true, auth.token);
        
    } catch (e) {
        e.location = "createCourse";
        //stepCallback(new Error('importCourse'), course);
        stepCallback(e, course);
    }
};

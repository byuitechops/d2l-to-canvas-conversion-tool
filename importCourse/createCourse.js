/*eslint-env node*/
/*eslint no-console:0*/
'use-strict';


const variables = require('../variables.js');


/*******************************
 * creates a new course in canvas
 * sets courseId in variables
 *********************************/
exports.run = (returnCallback) => {
    var request = require('request'),
        auth = require('../auth.json'),
        chalk = require('chalk'),
        courseName = variables.getCourseName();

        request.post({
            url: "https://byui.instructure.com/api/v1/accounts/1/courses",
            form: {
                'course[name]': courseName.split(' ')[0],
                'course[course_code]': courseName.split(' ')[1],
                'course[license]': "public_domain",
                'course[is_public_to_auth_users]': "true"
            }
        }, function (err, response, body) {
            if (err) {
                //console.log(err);
                returnCallback(err);
                return;
            } else {
                console.log(chalk.green(courseName + " Successfully created"));
                body = JSON.parse(body);
                console.log('Course Number: ', body.id);
                variables.setCourseId(body.id)
                returnCallback();
            }
        }).auth(null, null, true, auth.token);
}
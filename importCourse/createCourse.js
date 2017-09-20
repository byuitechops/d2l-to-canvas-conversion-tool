/*eslint-env node*/
/*eslint no-console:0*/
'use-strict';







/* Put dependencies here */

module.exports = (course, stepCallback) => {
    try {
        /* Code Body */

        /*******************************
         * creates a new course in canvas
         * sets courseId in variables
         *********************************/
        var request = require('request'),
            auth = require('../auth.json'),
            chalk = require('chalk');

        var courseName = course.info.courseName;
        var courseCode = ''; //FIX ME!!!

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
                throwError(err);
                return;
            } else {
                console.log(chalk.green(courseName + " Successfully created"));
                body = JSON.parse(body);
                console.log('Course Number: ', body.id);
                variables.setCourseId(body.id)
                stepCallback(null, course);
            }
        }).auth(null, null, true, auth.token);
    }


    /* end code body*/

    //INCLUDE THIS!!!
    course.report.moduleLogs['moduleName'].changes.push('');
    
    
} catch (e) {
    /* If we have an error, throw it back up to its parent module.
    YOU MUST replace "moduleName" with the name of this module. */
    stepCallback(new Error('moduleName'), course);
}
};

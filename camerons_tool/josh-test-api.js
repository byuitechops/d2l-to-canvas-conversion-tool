var canvas = require('canvas-wrapper')
var putObj = {
    'course[license]': 'private',
    'course[account_id]': '260',
    'course[is_public_to_auth_users]': false,
    'course[is_public]': false,
    'course[public_syllabus_to_auth]': true,
    'course[course_format]': 'on_campus',
    'course[term_id]': 1, //Default Term
    'course[locale]': 'en',
    'course[time_zone]': 'America/Denver',
    'course[grading_standard_id]': 0,
    //'course[sis_course_id]': `12-InstructorLastName`
};


canvas.put(`/api/v1/courses/59818`, putObj, (err, newCourse) => {
    if (err) {
        console.error(err);

    } else {

        console.log(newCourse)
    }
});
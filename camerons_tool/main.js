const prompt = require('./practice')

const d3 = require('d3-dsv')
var fs = require('fs');





function makeCourseObj(user, D2LCourses) {
    var allCourseObjs = D2LCourses.map(course => {
        var courseObj = JSON.parse(fs.readFileSync('./camerons_tool/defaultAnsOBJ.json', 'utf8'))
        courseObj.D2LOU = course.orgUnitID
        courseObj.instructorName = course.instructorName
        courseObj.instructorEmail = course.instructorEmail
        if (courseObj.instructorEmail) {
            courseObj.instructorEmail = courseObj.instructorEmail.replace(/@byui\.edu/gi, '');
        }
        courseObj.username = user.username
        courseObj.password = user.password
        // Getting the real modules that need to run
        courseObj.fullAgenda.forEach(module => module.run = require(module.name));
        return courseObj;
    })

    return allCourseObjs
}
async function main() {

    var userData = await prompt();
    var courseData = fs.readFileSync(userData.csvLocation, 'utf8');
    //console.log(contents);
    var D2LCourses = d3.csvParse(courseData);


    var courses = makeCourseObj(userData, D2LCourses);
    return courses;
}

module.exports = main;
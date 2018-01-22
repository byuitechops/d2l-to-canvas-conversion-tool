const asyncLib = require('async');
const canvas = require('canvas-wrapper');
const createCourseObj = require('create-course-object');
const uploadCourse = require('upload-course');
const path = require('path');
const createCourse = require('create-course');

module.exports = (courseData, finalCallback) => {

    /* Sets the information on the course object we'll need */
    function setInfo(course, waterCB) {
        console.log('setInfo');
        // course.info.canvasOU = course;
        course.info.zippedFilepath = path.resolve('.', `D2LOriginal`, courseData.courseInfo.path);
        waterCB(null, course);
    }

    /* Rename our new course to the course we've pulled the prototype lesson from */
    function renameCourse(course, waterCB) {
        canvas.put(`/api/v1/courses/${course.info.canvasOU}`,
        {
            'course[name]': courseData.courseInfo.path.split('.zip')[0],
            'course[course_code]': courseData.courseInfo.path.split('.zip')[0],
        },
        (err, changedCourse) => {
            if (err) {
                waterCB(err);
                return;
            }
            waterCB(null, course);
        });
    }

    const steps = [
        asyncLib.constant(courseData),
        createCourseObj,
        createCourse,
        setInfo,
        renameCourse,
        uploadCourse,
        // fileStructure,
    ];

    asyncLib.waterfall(steps, (err, course) => {
        if (err) {
            console.log(err);
            return;
        };

        console.log('Prototype Lesson course created:');
        console.log('https://byui.instructure.com/courses/' + course.info.canvasOU);
    });

}
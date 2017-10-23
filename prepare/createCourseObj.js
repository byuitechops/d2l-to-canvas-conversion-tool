/*eslint-env node, es6*/

/* Put dependencies here */
var Course = require('../classes/Course.js');

module.exports = (filePath, settings, stepCallback) => {
    /* Create the course object, give it the original filepath, and settings */

    /* Check if the filePath contains .ZIP */
    if (!(/\.zip/i).test(filePath)){
        filePath += '.zip';
    }

    var course = new Course(filePath, settings);
    /* Create report module for indexer main since course object didn't exist until now */
    course.addModuleReport('createCourseObj');
    /* We did it! */
    course.success('createCourseObj', 'Course object creation successful.');
    /* Have the course meet with the missionaries so it can be converted */
    stepCallback(null, course);
};
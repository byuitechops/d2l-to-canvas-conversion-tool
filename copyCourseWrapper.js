const copyACourse = require('copy-a-canvas-course');

module.exports = (course, stepCallback) => {
    /* don't run if copy is turned off */
    if(!course.info.copyCourse) {
        stepCallback(null, course);
        return;
    }
    
    /* sourseID, accountID, callback */
    copyACourse(course.info.canvasOU, 1 , (err, stuff) => {
        if (err) {
            course.fatalError(err);
            stepCallback(err, course);
            return;
        }
        stepCallback(null, course);
    });
};
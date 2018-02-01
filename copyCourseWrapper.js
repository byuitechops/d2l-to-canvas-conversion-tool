const copyACourse = require('copy-a-canvas-course');

module.exports = (course, stepCallback) => {
    /* don't run if copy is turned off */
    if(!course.info.copyCourse) {
        stepCallback(null, course);
        return;
    }
    
    /* sourceID, accountID, callback */
    copyACourse(course.info.canvasOU, 19 , (err, newCourse) => {
        if (err) {
            course.fatalError(err);
            stepCallback(err, course);
            return;
        }
        course.newInfo('prototypeOU', newCourse.id);
        course.message(`Prototype course copied with new OU of ${newCourse.id}`);

        stepCallback(null, course);
    });
};
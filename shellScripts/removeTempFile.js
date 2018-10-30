const canvas = require('canvas-wrapper');

module.exports = (course, stepCallback) => {
    /* make sure I need to run first */
    if (course.info.tempFile == undefined) {
        stepCallback(null, course);
        return;
    }

    /* get all files */
    canvas.get(`/api/v1/courses/${course.info.canvasOU}/files`, (getErr, files) => {
        if (getErr) {
            // ERROR why is course.error broken?
            console.error(getErr);
            stepCallback(null, course);
            return;
        }
        /* filter to the temp file created in course-has-content */
        var tempFile = files.find(file => file.filename === course.info.tempFile);

        if (tempFile == undefined) {
            course.warn(`Unable to find Temp file with name: ${course.info.tempFile}`);
            stepCallback(null, course);
            return;
        }

        /* delete the file */
        canvas.delete(`/api/v1/files/${tempFile.id}`, (deleteErr) => {
            if (deleteErr) {
                // ERROR course.error breaks. Why???
                console.error(getErr);
                stepCallback(null, course);
                return;
            }

            /* all done */
            course.message(`deleted temp file: ${course.info.tempFile}`);
            stepCallback(null, course);
            
        });
    });
};
var courseTemp = require('../courseTemplate.js');

/* Put dependencies here */
const fs = require('fs'),
    async = require('async');

module.exports = (course, stepCallback) => {
    try {
        function getGuts(file, cb) {
            fs.readFile(file, 'utf8', function (err, guts) {
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, guts);
            });
        }

        function getContents(content, cb) {
            fs.stat(content, function (err, stats) {
                if (err) {
                    cb(err);
                    return;
                }
                if (stats.isDirectory()) {
                    course.content.dirs.push({
                        name: content,
                        files: [],
                        dirs: []
                    });
                    cb(null, null);
                } else {
                    getGuts(content, function (err, guts) {
                        if(err){
                            cb(err);
                            return;
                        }
                        course.content.files.push({
                            name: content,
                            guts: guts
                        });
                    });
                    cb(null, null);
                }
            });
        }

        fs.readdir(__dirname, function (err, dirContents) {
            if (err) {
                throw err;
            }
            console.log('dirContents', dirContents.length);

            //ONLY RUNNING ONCE!!
            //FILTER OUT/ SKIP IMAGES AND WHATNOT

            async.each(dirContents, getContents, function (err, stuff) {
                if (err) {
                    throw err;
                } else {
                    /*course.report.moduleLogs['indexCourse']
                        .changes.push('Successfully indexed ' + course.info.courseName);*/
                    stepCallback(null, course);
                }
            });
        });

    } catch (e) {
        /* If we have an error, throw it back up to its parent module.
        YOU MUST replace "moduleName" with the name of this module. */
        e.location = 'indexCourse.js';
        stepCallback(e, course);
    }
};

module.exports(courseTemp, function (err, course) {
    //console.log(course);
    console.log(course.content.files);
    //console.log(course.content.dirs);
});

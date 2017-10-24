/*eslint-env node, es6*/
/*eslint no-unused-vars:1*/
/*eslint no-console:0*/

var canvas = require('canvas-wrapper');

module.exports = function (course, stepCallback) {
    course.addModuleReport('setSyllabus');

    function getPages(callBack) {
        canvas.get(`/api/v1/courses/${course.info.canvasOU}/pages`, (err, response) => {
            if (err) {
                callBack(err);
                return;
            }
            var pages = response;
            callBack(null, pages);
        });
    }

    function findSyllabus(callBack) {
        getPages((err, pages) => {
            if (err) {
                callBack(err);
                return;
            }
            var found = pages.find((page) => {
                return page.title.toLowerCase().includes('syllabus');
            });
            if (!found) {
                callBack('No syllabus page was found.');
            } else {
                callBack(null, found);
            }
        });
    }

    function getSyllabus(syllabusUrl, callback) {
        canvas.get(`/api/v1/courses/${course.info.canvasOU}/pages/${syllabusUrl}`, (err, response) => {
            if (err) {
                callback(err);
                return;
            }
            var syllabus = response[0].body;
            callback(null, syllabus);
        });
    }

    function putSyllabus(syllabusHTML, callback) {
        canvas.put(`/api/v1/courses/${course.info.canvasOU}`, {
            'course[syllabus_body]': syllabusHTML,
        }, (err1) => {
            if (err1) {
                callback(err1);
                return;
            }
            callback(null);
        });
    }


    findSyllabus((error, syllabus) => {
        if (error) {
            course.throwErr('setSyllabus', error);
            stepCallback(null, course);
            return;
        }
        getSyllabus(syllabus.url, (getSyllabusErr, syllabusHTML) => {
            if (getSyllabusErr) {
                course.throwErr('setSyllabus', getSyllabusErr);
                stepCallback(null, course);
                return;
            }
            putSyllabus(syllabusHTML, (putSyllabusErr) => {
                if (putSyllabusErr) {
                    course.throwErr('setSyllabus', putSyllabusErr);
                    stepCallback(null, course);
                    return;
                }
                course.success(
                    'setSyllabus',
                    'Successfully set the Syllabus content in the Syllabus tool'
                );
                canvas.delete(`/api/v1/courses/${course.info.canvasOU}/pages/` + syllabus.url, () => {
                    course.success(
                        'setSyllabus',
                        'Successfully deleted the Syllabus from Pages'
                    );
                    stepCallback(null, course);
                });
            });
        });
    });
};

/*eslint-env node, es6*/

/* Module Description */
/* Establishes the directories used by other modules */

/* Put dependencies here */
const fs = require('fs');

module.exports = (course, stepCallback) => {
    course.addModuleReport('setFilePaths');

    var setDirectory = (filepath, folderName, cb) => {
        fs.readdir(filepath, (err, files) => {
            if (err) {
                course.throwFatalErr('setFilePaths', err);
                stepCallback(err, course);
            } else {
                if (files.includes(folderName)) {
                    setDirectory(filepath, folderName + ' - Copy', cb);
                } else {
                    cb(`${filepath}\\${folderName}`);
                }
            }
        });
    }

    var setZipPath = (filepath, fileName, cb) => {
        fs.readdir(filepath, (err, files) => {
            if (err) {
                course.throwFatalErr('setFilePaths', err);
                stepCallback(err, course);
            } else {
                if (files.includes(fileName)) {
                    setZipPath(filepath, fileName.split('.zip')[0] + ' - Copy.zip', cb);
                } else {
                    cb(`${filepath}\\${fileName}`);
                }
            }
        });
    }

    /* Set the filepath we will be unzipping to */
    setDirectory(course.info.unzippedFilepath, course.info.fileName.split('.zip')[0], (newDir) => {
        course.info.unzippedFilepath = newDir;
        setDirectory(course.info.altUnzippedFilepath, course.info.fileName.split('.zip')[0], (newDir) => {
            course.info.altUnzippedFilepath = newDir;
            setZipPath(course.info.zippedFilepath, course.info.fileName, (newDir) => {
                course.info.zippedFilepath = newDir;
                stepCallback(null, course);
            });
        });
    });
};

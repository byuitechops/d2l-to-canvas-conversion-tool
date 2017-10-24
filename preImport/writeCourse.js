/*eslint-env node, es6*/
/*eslint no-console:1*/

/* Put dependencies here */
var path = require('path'),
    fs = require('fs'),
    asyncLib = require('async'),
    cp = require('cp'),
    mkdirp = require('mkdirp');

var writeCount = 0;
var copyCount = 0;

module.exports = (course, stepCallback) => {

    function writeAllFiles(files, cb1) {

        var checkWriteCount = (error, results) => {
            writeCount++;
            if (writeCount < 10 && results.length > 0) {
                writeAllFiles(results, cb1);
                return;
            }
            if (writeCount === 10) {
                course.throwErr('writeCourse', 'Reached write file attempt limit (10).');
                course.throwErr('writeCourse', 'Files not written: ${results}');
            }
            if (results.length === 0) {
                course.success('writeCourse', 'All editable files successfully written.');
            }
            /* Errors are never passed through from the filter, since it is a filter */
            cb1(null);
        };

        function writeFile(file, cb2) {
            fs.writeFile(file.path.replace('D2LProcessing', 'D2LProcessed'), 'utf8', writeError => {
                if (writeError) {
                    course.throwErr('writeCourse', `${file.name} could not write | ${writeError}`);
                    cb2(null, true);
                } else {
                    course.success(
                        'writeCourse', `${file.name} was successfully written.`
                    );
                    cb2(null, false);
                }
            });
        }
        asyncLib.filter(files, writeFile, checkWriteCount);
    }

    function copyAllFiles(files, cb1) {

        var checkCopyCount = (error, results) => {
            copyCount++;
            if (copyCount < 10 && results.length > 0) {
                copyAllFiles(results, cb1);
                return;
            }
            if (copyCount === 10) {
                course.throwErr('writeCourse', 'Reached copy file attempt limit (10).');
                results.forEach(file => {
                    course.throwErr('writeCourse', `File not copied: ${file.name}`);
                });
            }
            if (results.length === 0) {
                course.success('writeCourse', 'All binary files successfully copied.');
            }
            /* Errors are never passed through from the filter, since it is a filter */
            cb1(null);
        };

        function copyFile(file, cb2) {
            var newPath = file.path.replace('D2LProcessing', 'D2LProcessed');
            cp(file.path, newPath, (err) => {
                if (err) {
                    course.throwErr('writeCourse', `${file.name} could not copy | ${err}`);
                } else {
                    course.success('writeCourse', `${file.name} was successfully copied.`);
                    cb2(null, false);
                }
            });
        }
        asyncLib.filter(files, copyFile, checkCopyCount);
    }

    function createDir(dirPath, callback) {
        mkdirp(dirPath, (err) => {
            if (err) {
                course.throwErr('writeCourse', err);
                callback(err);
            } else {
                course.success(`writeCourse`, `${dirPath} successfully created.`);
                callback(null);
            }
        });
        // fs.mkdir(dirPath, (err) => {
        //     if (err) {
        //         course.throwErr('writeCourse', err);
        //         callback(err);
        //     } else {
        //         course.success(`writeCourse`, `${dirPath} successfully created.`);
        //         callback(null);
        //     }
        // });
    }

    /* Start Here */
    course.addModuleReport('writeCourse');
    /* Return array of just our files paths */
    var pathsToBuild = course.content.map(file => {
        return path.dirname(file.path).replace('D2LProcessing', 'D2LProcessed');
    });
    /* Return just the unique values of our paths,
    so we know what directories we need to make */
// //    pathsToBuild = [...new Set(pathsToBuild)];
//     var pathArray =[];
//     pathsToBuild.forEach((filePath) => {
//         filePath.split(path.sep).forEach((fileDir) => {
//             if (!pathArray.includes(fileDir)){
//                 pathArray.push(fileDir);
//             }
//         });
//     });

    /* Sort them alphabetically so we make sure we
    create the right folders first */
    pathArray = pathsToBuild.sort();
    /* Create the directories we need, one at a time */
    asyncLib.eachSeries(pathArray, createDir, createDirErr => {
        if (createDirErr) {
            console.log(createDirErr);
            course.throwFatalErr('writeCourse', createDirErr);
            stepCallback(createDirErr, course);
        } else {
            var writableFiles = course.content.filter(file => file.canEdit);
            var binaryFiles = course.content.filter(file => !file.canEdit);
            writeAllFiles(writableFiles, function (nullError1) {
                copyAllFiles(binaryFiles, (nullError2) => {
                    stepCallback(null, course);
                });
            });
        }
    });
};

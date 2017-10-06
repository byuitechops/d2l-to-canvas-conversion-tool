/*eslint-env node, es6*/

/* Put dependencies here */
var path = require('path'),
  fs = require('fs'),
  asyncLib = require('async');

module.exports = (course, stepCallback) => {
  var errCount = 0;
  var directories = [];

  function buildDirectories(file, callback) {
    var newPath = file.path.split('D2LProcessing')[1];
    newPath.split(path.sep);
    console.log(newPath);
  }

  try {

    function writeFile(file, path, checkCallback) {
      //checkCallback();
    }

    function makeDirectory(dir, check2Callback) {
      fs.mkdir(dir, (err) => {
        if (err) {
          errCount++;
        }
        if (errCount < 500) {
          console.log(errCount);
          course.throwErr('writeCourse', 'Error Count for attempting to make directories hit its limit.');
          check2Callback();
        }
      });
    }

    function checkDirectory(dir, callback) {
      fs.stat(dir, (err, stat) => {
        /* If directory does not exist... */
        if (err) {
          callback(false);
          /* If the directory exists... */
        } else {
          callback(true);
        }
      });
    }

    /* If file.canEdit is true, then we will write the file and if it
    is false, then we will copy the file (images, pdfs, etc.) */
    function checkIfWriteOrCopy(file, callback) {
      if (file.canEdit) {
        var tempPath = file.path.replace('D2LProcessing', 'D2LProcessed')
                        .split('\\');
        tempPath.splice(tempPath.length - 2);
        tempPath = tempPath.join('\\');
        checkDirectory(tempPath, (exists) => {
          if (!exists) {
            makeDirectory(tempPath, () => {
              checkIfWriteOrCopy(file);
            });
          } else {
            writeFile(file, tempPath, () => {
              console.log('Writing file...');
              callback(null);
            });
          }
        });
      } else {
        //copy the file
        // See if directory exists
          // If it doesn't, create dir
        // Copy file from original path to new path
        course.success('writeCourse', `${file.name} successfully copied.`);
        callback(null);
      }
    }

    /*start here*/
    course.addModuleReport('writeCourse');
    asyncLib.each(course.content, buildDirectories, (err) => {
      course.success('writeCourse', 'All course files processed.');
      stepCallback(null, course);
    });
  } catch (e) {
    console.log('FAIL');
    course.throwFatalErr('writeCourse', e);
    stepCallback(e, course);
  }
};

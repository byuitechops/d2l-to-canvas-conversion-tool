/*eslint-env node, es6*/

/* Put dependencies here */
var path = require('path'),
  fs = require('fs'),
  asyncLib = require('async');

module.exports = (course, stepCallback) => {
  try {
    course.addModuleReport('writeCourse');


    function daFunction(file) {
      if (file.canEdit) {
        //write the file  
      } else {
        //copy the file
      }
    }

    
    
    
    
    /*start here*/
    asyncLib.each(course.content, daFunction, (err, course) => {
      if (err) {
        course.throwFatalErr('writeCourse', e);
        stepCallback(e, course);
        return;
      }
      stepCallback(null, course);
    });
  } catch (e) {
    course.throwFatalErr('writeCourse', e);
    stepCallback(e, course);
  }
};

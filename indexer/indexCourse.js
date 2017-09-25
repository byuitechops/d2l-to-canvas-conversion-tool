var courseTemp = require('../courseTemplate.js');

/* Put dependencies here */
const fs = require('fs'),
  async = require('async');

module.exports = (course, stepCallback) => {
  try {


    function getGuts(file) {
      fs.readFile(file, 'utf8', function (err, guts) {
        if(err){
          throw err;
        }
        return guts;
      });
    }



    fs.readdir(__dirname, function (err, dirContents) {
      if (err) {
        throw err;
      }
      console.log('dirContents', dirContents.length);
      async.eachLimit(dirContents, 1, getContents, function (err, stuff) {
        if (err) {
          throw err;
        }
        stepCallback(null, course);
      });


      function getContents(content) {
        console.log('running');
        if (fs.statSync(content).isDirectory()) {
          course.content.dirs.push({
            name: content,
            files: [],
            dirs: []
          })
        } else {
          console.log('guts', getGuts(content));
          course.content.files.push({
            name: content,
            guts: getGuts(content)
          });
        }
      }
    });

    course.report.moduleLogs['indexCourse']
      .changes.push('Successfully indexed ' + course.info.courseName);
    //stepCallback(null, course);

  } catch (e) {
    /* If we have an error, throw it back up to its parent module.
    YOU MUST replace "moduleName" with the name of this module. */
    e.location = 'indexCourse.js';
    stepCallback(e, course);
  }
};

module.exports(courseTemp, function (err, course) {
  console.log(course);
  console.log(course.content.files);
  console.log(course.content.dirs);
});

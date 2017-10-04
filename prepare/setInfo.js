/* Put dependencies here */
const fs = require('fs'),
  DOMParser = require('xmldom').DOMParser,
  async = require('async');


module.exports = (course, stepCallback) => {
  try {
    /*create the module object so that we can access it later as needed*/
    course.report.getCourseName.moduleName = {
      fatalErrs: [],
      errors: [],
      changes: []
    };


    /* SET INFO */
    /* This is where the basic information for the course we don't
    already have is extracted and saved. This includes things like
    the course name and the course OU. */
    var setInfo = (XML, callback) => {

      /* Set the course name (API Call?) */
      course.info.courseName = 'Not in XML, may have to make API call...';

      /* Set the course OU by finding it in the manifest */
      course.info.D2LOU = XML.getElementsByTagName('manifest')[0]
        .getAttribute('identifier').split('_')[1];
      callback(null, XML);
    };

    /* PARSE THE XML STRING */
    /* Parses the XML string given to us by reading in the manifest */
    var parseXML = (XMLString, callback) => {
      XML = new DOMParser().parseFromString(XMLString, 'text/xml');
      callback(null, XML);
    };

    /* OPEN THE MANIFEST */
    /* Opens the manifest and returns an XML string of its contents */
    var openManifest = (callback) => {
      fs.readFile(course.info.unzippedFilepath +
        '/imsmanifest.xml', 'utf-8', (err, data) => {
          if (err) {
            callback(err, data);
          } else {
            callback(null, data);
          }
        });
    };

    async.waterfall([
      openManifest,
      parseXML,
      setInfo
    ], (err, result) => {
      if (err) {
        throw err;
      } else {
        course.report.moduleLogs.indexer.changes.push('getCourseName successfully retreived the course name');
        stepCallback(null, course);
      }
    });




    // On completion, return the course object back to its parent module.
  } catch (e) {
    /* If we have an error, throw it back up to its parent module.
    YOU MUST replace "moduleName" with the name of this module. */
    e.location = 'getCourseName';
    stepCallback(e, course);
  }
};

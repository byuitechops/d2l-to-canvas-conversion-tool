/* Put dependencies here */
const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;
const async = require('async');

module.exports = (course, stepCallback) => {
    try {

        /* SET CONTENT */
        /* Breaks down the course structure and saves it all, including
        each file's contents, into our massive course object. */
        function setContent(XML, callback) {
            // Say your prayers, this one is gonna hurt
            callback(null, XML);
        }

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
                stepCallback(err, course);
            } else {
                stepCallback(null, course);
            }
        });

        /* This line must be included in every child module. Change "moduleName"
        to match the name of this module. The success message should be included
        for each item that is fixed/changed/altered/captainamerica'd. Please be
        specific in the message. */
        course.report.moduleLogs['indexCourse']
            .changes.push('Successfully indexed ' + course.info.courseName);

        // On completion, return the course object back to its parent module.
    } catch (e) {
        /* If we have an error, throw it back up to its parent module.
        YOU MUST replace "moduleName" with the name of this module. */
        e.location = 'indexCourse.js';
        stepCallback(e, course);
    }
};

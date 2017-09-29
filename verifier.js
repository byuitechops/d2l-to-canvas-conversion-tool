module.exports = (courseObj, callback) => {

  const standardProperties = [
    'report',
    'settings',
    'info',
    'content'
  ];

  /* Check if it is a Course object */
  if (instanceof courseObj != 'Course') {
    callback('Object provided is not a Course object', courseObj);
  }

  /* Check if object contains properties */
  if (Object.keys(courseObj).length === 0) {
    callback('Course object provided is empty', courseObj);
  }

  /* Check if object contains the four standard properties */
  staticProperties.forEach((property) => {
    if (!Object.keys(courseObj).includes(property)) {
      callback(`Course object missing property: ${property}`, courseObj);
    }
  });

  /* Check if object contains extra properties */
  if (Object.keys(courseObj).length > 4) {
    callback(`Course object provided contains more than the four
              standard properties at the top level`, courseObj);
  }

  // Possible unit tests //
  /*
    - Provide an empty course
    - Provide a course with additional top-level properties
    - Provide a course with missing standard properties
    - Provide a course that is not a course object
    - Provide a course that has extra/removed properties in info/settings
  */

};

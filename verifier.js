module.exports = (courseObj, callback) => {

  const standardProperties = [
    'report',
    'settings',
    'info',
    'content'
  ];

  const standardInfoProperties = [
    'originalFilepath',
    'unzippedFilepath',
    'zippedFilepath',
    'fileName'
  ];

  const standardSettingsProperties = [
    'debug',
    'platform',
    'readAll'
  ];

  /* Check if it is a Course object */
  if (instanceof courseObj != 'Course') {
    callback('Object provided is not a Course object', courseObj);
  }

  /* Check if courses top level contains the standard properties */
  standardProperties.forEach((property) => {
    if (!Object.keys(courseObj).includes(property)) {
      callback(`Course object missing property: ${property}`, courseObj);
    }
  });

  /* Check if Info contains the standard properties */
  standardInfoProperties.forEach((property) => {
    if (!Object.keys(courseObj.info).includes(property)) {
      callback(`Course Info missing property: ${property}`, courseObj);
    }
  });

  /* Check if Settings contains the standard properties */
  standardSettingsProperties.forEach((property) => {
    if (!Object.keys(courseObj.settings).includes(property)) {
      callback(`Course Settings missing property: ${property}`, courseObj);
    }
  });

  /* Check if object contains extra properties */
  if (Object.keys(courseObj).length > 4 ||
      Object.keys(courseObj.info).length > 4 ||
      Object.keys(courseObj.settings).length > 3) {
    callback(`Course object provided contains extra
              properties it should not have`, courseObj);
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

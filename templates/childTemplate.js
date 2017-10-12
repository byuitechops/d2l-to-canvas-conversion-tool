/*eslint-env node, es6*/

/* Module Description */

/* Put dependencies here */

/* Include this line only if working on a post-import child module */
var canvas = require('./canvas.js');

module.exports = (course, stepCallback) => {
  /*create the module object so that we can access it later as needed.
  This MUST be done at the beginning of each child module */
  course.addModuleReport('moduleName');
  course.success('moduleName', 'Report Module created for moduleName');

  /* This line is optional. It is used to save variables so that they can
  be accessed in later modules. The Key is the name of the variable and the
  value is the variable to be saved*/
  course.newInfo('propertyName', 'value');

  /* This line must be included in every child module. Change "moduleName"
  to match the name of this module. The success message should be included
  for each item that is fixed/changed/altered/captainamerica'd. Please be
  specific in the message. */
  course.success('moduleName', 'moduleName successfully ...');

  // On completion, return the course object back to its parent module.
  stepCallback(null, course);

  /* How to throw a non-fatal error (Replace "moduleName") */
  course.throwErr('moduleName', e);
  /* DO NOT call the callback on a non-fatal error - instead, continue
  with your child module's process */

  /* How to throw a fatal error */
  course.throwFatalErr('moduleName', e);
  stepCallback(e, course);
};

/*eslint-env node, es6*/

/* Put dependencies here */

module.exports = (course, stepCallback) => {
   try {
      /*create the module object so that we can access it later as needed. 
      This MUST be done at the beginning of each child module */
      course.addModuleReport('moduleName');

      /* This line is optional. It is used to save variables so that they can
      be accessed in later modules. The Key is the name of the variable and the 
      value is the variable to be saved*/
      course.newInfo('key', 'value');
      
      /* This line must be included in every child module. Change "moduleName"
      to match the name of this module. The success message should be included
      for each item that is fixed/changed/altered/captainamerica'd. Please be
      specific in the message. */
      course.success('moduleName', 'childTemplate successfully ...');

      // On completion, return the course object back to its parent module.
      stepCallback(null, course);
      
   } catch (e) {
      /* If we have an error, throw it back up to its parent module.
      YOU MUST replace "moduleName" with the name of this module. */
      e.location = 'moduleName';
      
      /* How to throw a non-fatal error */
      course.throwErr(e.location, e);
      
      /* How to throw a fatal error */
      stepCallback(e, course);
   }
};

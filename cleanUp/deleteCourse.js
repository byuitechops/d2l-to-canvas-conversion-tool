/*eslint-env node, es6*/

/* Part of clean up. This module deletes the course 
 out of canvas if a fatal error was thrown */

const canvas = require('../canvas.js');

module.exports = (course, stepCallback) => {
   course.addModuleReport('deleteCourse');
   /* Don't run if delete course flag is on */
   if (!course.settings.deleteCourse) {
      course.success('deleteCourse', 'deleteCourse determined the course did not need to be deleted.');
      stepCallback(null, course);
      return;
   }


   /* Delete Course Here */
   var url = `/api/v1/courses/${course.info.canvasCourseOU}?event=delete`;
   canvas.delete(url, (err, response) => {
      if (err) {
         course.throwErr('deleteCourse', err);
         return;
      } else if (response.statusCode != 200) {
         course.throwErr('deleteCourse', new Error(`Status Code: ${response.statusCode}`));
         stepCallback(null, course);
         return;
      }
      course.success('deleteCourse', 'deleteCourse successfully deleted the course from Canvas');
      stepCallback(null, course);
   });
}
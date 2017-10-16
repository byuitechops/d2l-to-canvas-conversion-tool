/*eslint-env node, es6*/

/* Module Description */

/* Put dependencies here */

/* Include this line only if working on a post-import child module */
var canvas = require('../canvas.js');

module.exports = (course, stepCallback) => {

    canvas.delete('/api/v1/courses/322?event=delete', (err, response, body) => {
        if (err) {
            console.log(err);
        }
        console.log(response.statusCode);
    });

    stepCallback(null, course);
};

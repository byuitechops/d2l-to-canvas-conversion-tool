/* eslint-env node, es6 */

const asyncLib = require('async');

module.exports = (data) => {
    // console.log(data);
    return new Promise((resolve, reject) => {
        let modules = data.fullAgenda.map(module => module.run);
        console.log(modules);
        asyncLib.waterfall([asyncLib.constant(data), ...modules], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
/* eslint-env node, es6 */

const asyncLib = require('async');
const agenda = require('./agenda.js');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        let modules = data.fullAgenda.map(module => module.run);
        asyncLib.waterfall([asyncLib.constant(data), ...modules], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
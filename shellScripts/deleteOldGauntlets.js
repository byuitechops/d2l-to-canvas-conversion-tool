/* eslint no-console:0 */

const canvas = require('canvas-wrapper');
const asyncLib = require('async');

canvas.get('/api/v1/accounts/1/courses?search_term=Gauntlet', (err, gauntlets) => {
    if (err) console.error(err);
    else {
        asyncLib.eachLimit(gauntlets, 5, (gauntlet, callback) => {
            if (!gauntlet.name.includes('Pristine')) {
                canvas.delete(`/api/v1/courses/${gauntlet.id}?event=delete`, (err, result) => {
                    console.log(gauntlet.name);
                    console.log(gauntlet.id);
                    console.log(result);
                    callback(null);
                });
            } else callback(null);
        }, (eachErr) => {
            if (eachErr) console.error(eachErr);
            console.log(gauntlets.length + ' courses deleted.');
        });
    }
});

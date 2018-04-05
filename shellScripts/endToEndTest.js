const fs = require('fs');
const asyncLib = require('async');

module.exports = (course, stepCallback) => {

    /* Check if we're doing an end-to-end test */
    if (process.env.npm_lifecycle_event !== 'test') {
        // course.message('Testing skipped.');
        // stepCallback(null, course);
        return;
    }

    function getTests() {

        var nodeModules = fs.readdirSync('./node_modules');
        var moduleTests = [];
        var untouchables = [
            '.',
            '@',
        ];

        nodeModules = nodeModules.filter(module => {
            if (untouchables.includes(module[0])) {
                return false;
            }

            if (!fs.readdirSync(`./node_modules/${module}`).includes('package.json')) {
                return false;
            }

            return true;
        });

        nodeModules.forEach(module => {

            // Read in the package.json for each module
            var packageJSON = fs.readFileSync(`./node_modules/${module}/package.json`);
            packageJSON = JSON.parse(packageJSON);

            // Check if it has childTests, if it is one of ours
            if (packageJSON.childType) {
                try {
                    var testsFiles = fs.readFileSync(`./node_modules/${module}/Tests/childTests.js`);
                } catch (e) {
                    console.log('No child tests for: ' + module);
                }
            }

            // If it is one of ours and has tests, save it!
            if (packageJSON.childType && testsFiles) {
                try {
                    moduleTests.push(require(`../node_modules/${module}/Tests/childTests.js`));
                } catch (e) {
                    console.log(e);
                    console.log('Unable to get child tests for: ' + module);
                }
            }

        });

        return moduleTests;
    }

    function runTests(tests) {
        return new Promise((resolve, reject) => {

            asyncLib.eachSeries(tests, (childTests, eachCallback) => {
                childTests(course, (err, courseObject) => {
                    if (err) return reject(err);
                    eachCallback(null);
                });
            }, (err) => {
                if (err) return reject(err);
                resolve();
            });

        });
    }

    var tests = getTests();
    runTests(tests);
    // TEMP, FIX FOR ASYNCY
    stepCallback(null, course);
};
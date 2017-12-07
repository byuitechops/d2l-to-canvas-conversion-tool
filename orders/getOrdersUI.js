/*eslint-env node, es6*/
/*eslint no-console:0*/

const downloader = require('d2l-course-downloader'),
    conversion = require('../main.js'),
    asyncLib = require('async'),
    chalk = require('chalk'),
    path = require('path'),
    fs = require('fs'),
    getOrders = require('./getOrders.js');

getOrders((orderList) => {

    function compileChildren(order) {
        return Object.keys(order).filter(prop => order[prop].includes('Run on my course'));
    }

    function startConversion(courses) {
        courses.forEach((course, index) => {
            course.childModules = compileChildren(orderList[index]);
        });
        asyncLib.eachSeries(courses, conversion, (err, resultCourses) => {
            if (err) {
                console.log(chalk.red('\nError writing report to report.json'));
            }
        })
    }

    /* Read in the JSON file with the information we need from the UI */
    fs.readFile('./userInterface/tmp.json', 'utf8', (err, data) => {
        var userData = JSON.parse(data);
        userData.downloadLocation = './D2LOriginal';
        userData.ous = orderList.map(order => {
            return order.courseOU;
        });
        fs.unlink('./userInterface/tmp.json', unlinkErr => {
            if (unlinkErr) console.error(unlinkErr);
            else {
                if (err) console.error(err);
                else {
                    downloader(userData, (error, resultCourses) => {
                        if (error) console.error(error);
                        else {
                            var courses = resultCourses.map(course => {
                                return {
                                    "settings": userData.settings,
                                    "path": course.name
                                };
                            });
                            startConversion(courses);
                        }
                    });
                }
            }
        });
    });
});

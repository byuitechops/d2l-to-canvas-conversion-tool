/*eslint-env node, es6*/
/*eslint no-console:0*/

const downloader = require('d2l-course-downloader'),
    argv = require('yargs').argv,
    conversion = require('../main.js'),
    asyncLib = require('async'),
    chalk = require('chalk'),
    path = require('path'),
    getOrders = require('./getOrders.js'),
    prompt = require('prompt');

var settings = {
    'debug': argv.d || argv.D || argv.debug ? argv.d : false,
    'readAll': argv.a || argv.A || argv.all ? argv.a : false,
    'online': argv.o || argv.O || argv.online ? true : false,
    'keepFiles': argv.k || argv.K || argv.keep ? true : false,
    'deleteCourse': argv.x || argv.X || argv.delete ? true : false,
    'useDownloader': argv.e || argv.E || argv.existing ? false : true
};

var promptSettings = [{
        name: 'userName',
        type: 'string',
        description: chalk.cyanBright('Enter your username:'),
        required: true,
        message: 'Username cannot be empty.'
    },
    {
        name: 'password',
        description: chalk.cyanBright('Enter your password:'),
        type: 'string',
        required: true,
        hidden: true,
        replace: '*',
        message: 'Password cannot be empty.'
    }
];

getOrders(orderList => {
    function startConversion(courses) {
        asyncLib.eachSeries(courses, conversion, (err, resultCourses) => {
            if (err) {
                console.log(chalk.red('\nError writing report to report.json'));
            }
            console.log(resultCourses);
        })
    }

    prompt.get(promptSettings, (err, promptData) => {
        if (err) {
            callback(err, promptData);
        } else {
            downloader(promptData, orderList, (resultCourses) => {
                var courses = resultCourses.map(course => {
                    return {
                        "settings": settings,
                        "path": course.name
                    };
                });
                startConversion(courses);
            });
        }
    });
});

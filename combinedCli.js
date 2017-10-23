const downloader = require('d2l-course-downloader'),
    argv = require('yargs').argv,
    conversion = require('./main.js'),
    asyncLib = require('async'),
    chalk = require('chalk');

var settings = {
    'debug': argv.d || argv.D || argv.debug ? argv.d : false,
    'readAll': argv.a || argv.A || argv.all ? argv.a : false,
    'online': argv.o || argv.O || argv.online ? true : false,
    'keepFiles': argv.k || argv.K || argv.keep ? true : false,
    'deleteCourse': argv.x || argv.X || argv.delete ? true : false
};

downloader((results) => {
    /* Convert list of results to a list of paths */
    var courses = results.map((result) => {
        return {
            "settings": settings,
            "path": result.name
        };
    });
    // conversion takes settings & final cb. how to add path...??
    asyncLib.eachSeries(courses, conversion, (err, resultCourse) => {
        if (err) {
            console.log(chalk.red('Error writing report to report.json'));
        }
        console.log('\nFinal report written to report.json');
    })
});


//where will we add flags??? This cli will have to accept them... oops
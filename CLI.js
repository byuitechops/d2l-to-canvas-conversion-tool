/* eslint no-console:0 */

const prompt = require('./prompt.js');
const pMap = require('p-map');
const downloader = require('d2l-course-downloader');
const main = require('./main.js');
const folderSetup = require('d2l-to-canvas-conversion-folder-setup');
const promptReplacement = require('./camerons_tool/main');
var moment = require('moment');
require('moment-precise-range-plugin');
const fs = require('fs');

function makeFile(data) {
    fs.writeFileSync("ourData.json", JSON.stringify(data, null, 4));
    return data;
}


function writeItDown(data, fileName) {
    var fileNumber = fileName.replace(/^\D+/g, '');
    fs.writeFileSync(`../report${fileNumber}.json`, JSON.stringify(data), 'utf8');
    console.log(`Report created as report${fileNumber}.json`);
}

function doWhenDone(data, err) {
    var report = {
        id: data.D2LOU,
        instructor: data.instructorName,
        instructorEmail: data.instructorEmail,
        message: "No Issues"
    }
    if (err) {
        report.messsage = err.messsage
        report.stack = err.stack
    }

    return report;
}

/* Prompt the user for the needed information */
async function doStuffMagicFunTime(data) {
    return new Promise(async (resolve, reject) => {
        try {
            await Promise.resolve(folderSetup(data))
                .then(folderSetup)
                .then(downloader)
                .then(makeFile)
                .then(main)
            resolve(doWhenDone(data))
        } catch (err) {
            resolve(doWhenDone(data, err))
        }
    })

}

async function test() {
    let data = await promptReplacement();
    var start = moment();
    console.log(start)
    //let courseNumber = Math.floor((data.length - 2) * Math.random());
    //let newCourseList = data.slice(courseNumber, courseNumber + 1);
    // console.log(newCourseList);

    const report = await pMap(data.courses, doStuffMagicFunTime, {
        concurrency: 1
    });

    writeItDown(report, data.fileName)

    var end = moment()
    console.log(moment(start).preciseDiff(end));
    // console.log(result);

    // for (let index = 0; index < newCourseList.length; index++) {
    //     await doStuffMagicFunTime(newCourseList[index]);
    // }
}

test()
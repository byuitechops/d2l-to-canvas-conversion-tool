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
const path = require('path');

function makeFile(data) {
    fs.writeFileSync("ourData.json", JSON.stringify(data, null, 4));
    return data;
}


function writeItDown(data, filePath) {
    // Extracts the number from the file name
    // var fileName = "C:\\Users\\levistum\\Downloads\\filesToConvert\\In Progress\\batch20.csv";
    var fileName = path.basename(filePath, '.csv');
    var fileNumber = fileName.replace(/^\D+/g, '');

    // Writes report to a file called report## where ## is the original batch number
    fs.writeFileSync(`../Reports/report${fileNumber}.json`, JSON.stringify(data), 'utf8');
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
    // console.log(start)
    const report = await pMap(data.courses, doStuffMagicFunTime, {
        concurrency: 1
    });

    writeItDown(report, data.filePath)

    var end = moment()
    console.log(moment(start).preciseDiff(end));
}

test()
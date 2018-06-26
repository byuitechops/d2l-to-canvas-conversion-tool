// This script fixes courses that have .zip in the styling class (i.e. hs345.zip-bobb)

// This is a quickfix for ECON 151 (and possibly other courses) where the styling classes did not insert correctly

const Enquirer = require('enquirer');
const enquirer = new Enquirer();
const canvas = require('canvas-api-wrapper');
const cheerio = require('cheerio');
const fs = require('fs');

function gatherIDs() {
    let fileNames = fs.readdirSync('./shellScripts/courseReportsToFix');

    return fileNames.map(fileName => {
        let fileContents = fs.readFileSync(`./shellScripts/courseReportsToFix/${fileName}`, 'utf8');

        return /Course\sID:\s\d*/.exec(fileContents)[0].split(': ')[1];
    });
}

async function fixCourse(courseId) {

    async function fixClasses(item) {
        try {
            if (item.getHtml()) {

                var $ = cheerio.load(item.getHtml());
                $(`.byui`).each((index, el) => {
                    if ($(el).attr('class').includes('.zip')) {
                        $(el).attr('class', $(el).attr('class').replace('.zip', ''));
                    }
                });
                item.setHtml($.html());
                await item.update();
                console.log(item.getTitle() + ' has been updated.');
            }
        } catch (e) {
            // console.error(e);
        }
    }

    try {

        let course = canvas.getCourse(courseId);
        await course.getComplete();

        var all = course.getSubs();

        all = all.reduce((acc, sub) => [...acc, ...sub], []);
        let questions = course.quizzes.reduce((acc, quiz) => [...acc, ...quiz.questions], []);
        all = [...all, ...questions];

        for (let x = 0; x < all.length; x++) {
            fixClasses(all[x]);
        }

    } catch (e) {
        console.error(e);
    }
}



(async () => {
    let courseIds = gatherIDs();

    for (let i = 0; i < courseIds.length; i++) {
        await fixCourse(courseIds[i]);
        console.log(courseIds[i] + ' complete.');
    }
})();
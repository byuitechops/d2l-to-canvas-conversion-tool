const $ = require('./template.js');
const fs = require('fs');
const path = require('path');

module.exports = (course, stepCallback) => {

    // Set Title
    $('title').html(`${course.info.fileName.split('.zip')[0]} Conversion Report`);

    // Set D2L href & text
    $('#d2l-link').attr(`href`, `https://byui.brightspace.com/d2l/home/${course.info.D2LOU}`);
    $('#d2l-link').html(`https://byui.brightspace.com/d2l/home/${course.info.D2LOU}`);

    // Set Canvas href & text
    $('#canvas-link').attr(`href`, `https://byui.instructure.com/courses/${course.info.canvasOU}`);
    $('#canvas-link').html(`https://byui.instructure.com/courses/${course.info.canvasOU}`);

    // Set D2L OU
    $('#d2l-ou').html(`<span class="title">OU:</span> ${course.info.D2LOU}`);

    // Set Canvas ID
    $('#canvas-id').html(`<span class="title">ID:</span> ${course.info.canvasOU}`);

    // Set Date
    var date = new Date();
    date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    var folderDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}.${date.getMinutes()}`;
    $('#date').html(`<span class="title">Conversion Date:</span> ${date}`);

    fs.writeFile(path.resolve('.', `./reports`, `${course.info.fileName.split('.zip')[0]} ${folderDate}.html`), $.html(),
        (err) => {
            if (err) console.error(err);
            else {
                console.log('Report saved in Reports folder.');
                stepCallback(null, course);
            }
        }
    );

}

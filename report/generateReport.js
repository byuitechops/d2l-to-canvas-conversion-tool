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
    var htmlDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    var folderDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}.${date.getMinutes()}`;
    $('#date').html(`<span class="title">Conversion Date:</span> ${htmlDate}`);


    var sectionTemplate =
    `<li>
        <div class="collapsible-header blue"><i class="material-icons">|ICON|</i>|SECTIONTITLE|</div>
        <div class="collapsible-body">
            <div class="description">
                |SECTIONDESCRIPTION|
            </div>
            <div id="|ID|-items">

            </div>
        </div>
    </li>`;

    var reportTemplate =
    `<div class="collapsible-header"><i class="material-icons">short_text</i>|REPORTTITLE|</div>
        <div class="collapsible-body">
            <div class="description">
                |ITEMDESCRIPTION|
            </div>
            <div class="data-list">
                <ul id="|ID|-items" class="collection">

                </ul>
            </div>
        </div>`;

    var reportItemTemplate =
    `<li class="collection-item"><div>|ITEMTITLE|<a href="|ITEMURL|" target="_blank" class="secondary-content">|ITEMURL|</a></div></li>`;

    // Get report sections

    var reportSections = course.info.reportSections;

    function addSection() {

    }

    function addReports() {

    }

    function addItems() {

    }

    /* Add report Sections */
    reportSections.forEach(reportSection => {
        // Generate dynamic ID
        var sectionId = reportSection.title.replace(/\s+/g, '-').toLowerCase();
        // Insert the title
        var newSection = sectionTemplate.replace(/\|SECTIONTITLE\|/gi, reportSection.title);
        // Insert the icon
        newSection = newSection.replace(/\|ICON\|/gi, reportSection.icon);
        // Insert the description
        newSection = newSection.replace(/\|SECTIONDESCRIPTION\|/gi, reportSection.description);
        // Insert the ID
        newSection = newSection.replace(/\|ID\|/gi, sectionId);
        // Append the new section
        $('#report-sections').append(newSection);
        console.log(sectionId);

        /* Add reports */
        reportSection.reportItems.forEach(reportItem => {
            var reportItemId = reportItem.title.replace(/\s+/g, '-').toLowerCase();
            var newReportItem = reportTemplate.replace(/\|REPORTTITLE\|/gi, reportItem.title);
            newReportItem = newReportItem.replace(/\|ITEMDESCRIPTION\|/gi, reportItem.title);
            newReportItem = newReportItem.replace(/\|ID\|/gi, reportItemId);
            $(`#${sectionId}-items`).append(newReportItem);

            /* Add report items*/
            reportItem.items.forEach(item => {
                var newItem = reportItemTemplate.replace(/\|ITEMTITLE\|/gi, item.title);
                newItem = newItem.replace(/\|ITEMURL\|/gi, item.url);
                $(`#${reportItemId}-items`).append(newItem);
            });
        });
    });

    fs.writeFile(path.resolve('.', `./reports`, `${course.info.fileName.split('.zip')[0]} ${folderDate}.html`), $.html(),
        (err) => {
            if (err) console.error(err);
            else {
                stepCallback(null, course);
            }
        }
    );

}

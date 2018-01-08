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
    if (date.getHours() < 12) {
        var ampm = 'AM';
    } else {
        var ampm = 'PM';
    }
    var htmlDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} ${ampm}`;
    var folderDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}.${date.getMinutes()}`;
    $('#date').html(`<span class="title">Conversion Date:</span> ${htmlDate}`);

    var sectionTemplate =
    `<li>
        <div class="collapsible-header">
            <i class="material-icons black-text">|ICON|</i>
            |TITLE|
            <div href="#!" class="right-align">
                <i class="material-icons light-blue-text text-lighten-2">arrow_drop_down_circle</i>
                </div>
            </div>
        <div class="collapsible-body">
            <div class="description">
                |DESCRIPTION|
            </div>
            <ul class="collection" id="|ID|">

            </ul>
        </div>
    </li>`;

    var  itemTemplate =
    `<li class="collection-item blue lighten-5 grey-text text-darken-3"><div>|TITLE|<a href="|URL|" target="_blank" class="secondary-content">|URL|</a></div></li>`;

    /* Get the reports from the info object */
    var reportSections = course.info.reportSections;

    function addSection(reportSection) {
        if (!reportSection.items) {
            return;
        }

        /* Set up the new template's title */
        var report = sectionTemplate.replace('|TITLE|', reportSection.title);
        /* Put in the icon */
        report = report.replace('|ICON|', reportSection.icon);
        /* Put in the description */
        report = report.replace('|DESCRIPTION|', reportSection.description);
        /* Create the ID */
        var ID = reportSection.title.toLowerCase().replace(/\s+/g, '-') + '-items';
        /* Put in the ID */
        report = report.replace('|ID|', ID);

        /* Add the new section to the report */
        $('#report-sections').append(report);

        /* If we've added a null index to the report's items so we can skip it... */
        if (reportSection.items[0] == null) {
            return;
        }

        /* Add all the items to the new section */
        reportSection.items.forEach(item => {
                /* Add the title */
                var itemContent = itemTemplate.replace('|TITLE|', item.title);
                /* Add the URL */
                if (item.url) {
                    itemContent = itemContent.replace(/\|URL\|/g, item.url);
                } else {
                    itemContent = itemContent.replace(/\|URL\|/g, '');
                }
                /* Add the item to the report section */
                $(`#${ID}`).append(itemContent);
        });
    }

    /* Add report Sections */
    reportSections.forEach(reportSection => {
        addSection(reportSection);
    });

    /* Write the report file to the "reports" folder */
    fs.writeFile(path.resolve('.', `./reports`, `${course.info.fileName.split('.zip')[0]} ${folderDate}.html`), $.html(),
        (err) => {
            if (err) console.error(err);
            else {
                stepCallback(null, course);
            }
        }
    );

}

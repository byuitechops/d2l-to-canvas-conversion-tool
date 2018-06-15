module.exports = (course, stepCallback) => {
    var headerTemplate = `
            <h3>${course.info.courseCode}</h3>
            <div>
                <span class="header1">Brightspace</span>
                <span class="header1 right">Canvas</span>
            </div>
            <div>
                <span class="header3">Course OU: ${course.info.D2LOU}</span>
                <span class="header3 right">Course ID: ${course.info.canvasOU}</span>
            </div>
            <div>
                <a target="_blank" href="https://byui.brightspace.com/d2l/home/${course.info.D2LOU}">https://byui.brightspace.com/d2l/home/${course.info.D2LOU}</a>
                <a target="_blank" href="https://byui.instructure.com/courses/${course.info.canvasOU}" class="right">https://byui.instructure.com/courses/${course.info.canvasOU}</a>
            </div>`;

    // Set the tag descriptions
    course.logger.setTagDescription('ERR Identified', 'An <strong>ERR</strong> is an External Resource, such as Maple TA or TestOut. Below are listed all the locations where an external resource is linked to in the course.');
    course.logger.setTagDescription('Pages Deleted', 'Pages completely removed from the course in Canvas.');
    course.logger.setTagDescription('Discussions Deleted', 'Discussions completely removed from the course in Canvas.');
    course.logger.setTagDescription('Quizzes Deleted', 'Quizzes completely removed from the course in Canvas.');
    course.logger.setTagDescription('Assignments Deleted', 'Assignments completely removed from the course in Canvas.');
    course.logger.setTagDescription('Modules Deleted', 'Assignments completely removed from the course in Canvas.');
    course.logger.setTagDescription('Module Items Deleted', 'Assignments completely removed from the course in Canvas.');
    course.logger.setTagDescription('Questions with Import Issues', 'This list is of all questions in the course that will have some kind of issue on import. Some of the issues may have been resolved by other parts of the conversion process.');
    course.logger.setTagDescription('Unused Files', 'These files are not being used in the course. They have been moved to the "archive" folder in course files.');
    course.logger.setTagDescription('Used Files', 'These files are currently being used in the course.');
    course.logger.setTagDescription('Module Descriptions Deleted', 'Since Canvas does not have descriptions on modules, Canvas creates a page for each module description that was in the Brightspace course. The ones listed here have been removed.');
    course.logger.setTagDescription('Quiz Overlays Updated', 'Some quizzes have a specific type of overlay that causes import issues, which breaks the question. This corrects those issues so the question functions normally.');
    course.logger.setTagDescription('Folders Deleted', 'Folders deleted in Course Files in Canvas.');
    course.logger.setTagDescription('', '');

    console.log(`Course created at: https://byui.instructure.com/accounts/${course.settings.accountID}/courses/${course.info.canvasOU}`);
    if (course.info.backupOU) console.log(`Backup course created at: https://byui.instructure.com/accounts/${course.settings.accountID}/courses/${course.info.backupOU}`);
    if (course.info.prototypeOU) console.log(`PrototypeOU used: https://byui.instructure.com/accounts/${course.settings.accountID}/courses/${course.info.prototypeOU}`);

    console.log(course.info.courseCode);
    // Set the report title
    course.logger.reportTitle = course.info.courseCode;
    if (!course.logger.reportTitle) {
        course.logger.reportTitle = course.info.courseName;
    }
    // Set the Report Header
    course.setReportHeader(headerTemplate);
    // Generate the Console Report
    course.consoleReport();
    // Generate the JSON Report
    course.jsonReport('./reports');
    // Generate the HTML Report
    course.htmlReport('./reports');
    stepCallback(null, course);
};
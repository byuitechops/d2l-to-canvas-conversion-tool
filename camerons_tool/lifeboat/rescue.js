const fs = require("fs");
const csv = require('d3-dsv');
const canvas = require('canvas-api-wrapper');

function newFormat(courseId, instructor, email) {
    var ins = instructor
        .split('|')
        .map((e) => {
            return e.split(' ').reverse().join(', ')
        })
        .join('|');
    return {
        "orgUnitID": courseId,
        "instructorName": ins,
        "instructorEmail": email
    };
}

// the api call
async function getInstructorEnrollments(id) {
    id = id.padStart(9, '0');
    var apiCall = `/api/v1/users/sis_user_id:${id}/enrollments?per_page=100&type[]=TeacherEnrollment`;
    return canvas.get(apiCall);
}

function customFind(array, term) {
    for (let i = 0; i < array.length; i++) {
        var element = array[i];
        if (JSON.stringify(term) === JSON.stringify(element)) return true;
    }
    return false;
}

async function rescue(input) {
    /* PARSE CSVOFDOOM.CSV */
    var oldCourses = csv.csvParse(fs.readFileSync(input + ".csv", 'utf8'));

    for (let i = 0; i < oldCourses.length; i++) {
        const course = oldCourses[i];
        course.code = course.code.split('.');
        course.name = course.name.split(';');
        course.instructorId = course.instructorId.split('|');
        course.instructorName = course.instructorName.split('|');
        course.instructorEmail = course.instructorEmail.split('|');
    }

    /* the final results will be here */
    var newData = [];
    var enrollmentResults = []

    /* check for each instructor's enrollments */
    for (let i = 0; i < oldCourses.length; i++) {
        const course = oldCourses[i];
        var instructors = [];
        for (let j = 0; j < course.instructorId.length; j++) {
            const id = course.instructorId[j];
            var enrollments = getInstructorEnrollments(id);
            instructors[j] = enrollments;
        }
        enrollmentResults[i] = instructors;
    }

    // wait for all the instructors results
    for (let i = 0; i < enrollmentResults.length; i++) {
        enrollmentResults[i] = await Promise.all(enrollmentResults[i]);
    }

    // check through each course
    for (let i = 0; i < oldCourses.length; i++) {
        const course = oldCourses[i];
        // and each enrollment
        const enrollments = enrollmentResults[i];
        // this means copy over the course because we haven't found it in canvas yet
        var doNotCopy = false;
        // for each instructor of this course
        for (let j = 0; j < enrollments.length; j++) {
            const instructor = enrollments[j];
            for (let k = 0; k < instructor.length; k++) {
                const enrolled = instructor[k];
                // check that there is a course id
                if (enrolled.sis_course_id !== null) {
                    // check that the instructor has spent time in the course
                    // so that I'm sure it's not a shell
                    if (enrolled.total_activity_time > 0) {
                        // check if the course is the one we're looking for
                        if (oldCourses[i].code[3] === enrolled.sis_course_id.split('.')[4]) {
                            // the course is already active in canvas
                            doNotCopy = true;
                        }
                    }
                }
            }
        }
        // this course was NOT in canvas,
        // let's add this course to the list!
        if (!doNotCopy) {
            // check if it's already in the list
            if (!customFind(newData, course)) {
                // boom, now cameron knows this course is needed.
                newData.push(course);
            }
        }
    }

    for (let i = 0; i < newData.length; i++) {
        newData[i].code = newData[i].code.join('.');
        newData[i].name = newData[i].name.join(';');
        newData[i].instructorId = newData[i].instructorId.join('|');
        newData[i].instructorName = newData[i].instructorName.join('|');
        newData[i].instructorEmail = newData[i].instructorEmail.join('|');
    }

    fs.writeFileSync(input + "_saved" + ".csv", csv.csvFormat(newData), 'utf8');
    return input + "_saved";
}

function convertForCameron(input, output) {
    var data = csv.csvParse(fs.readFileSync(input, 'utf8'));
    var newData = [];
    for (let i = 0; i < data.length; i++) {
        const e = data[i];
        newData.push(newFormat(e.id, e.instructorName, e.instructorEmail));
    }
    fs.writeFileSync(output, csv.csvFormat(newData), 'utf8');
}

function customFind2(array, term) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.code.split(',')[3] === term) return true;
    }
    return false;
}

// function cleanup(input) {
//     var data = csv.csvParse(fs.readFileSync(input, 'utf8'));

//     fs.writeFileSync("clean_" + input, csv.csvFormat(newData), 'utf8');
//     return "clean_" + input;
// }

function compareYear(a, b) {
    if (a.code.split('.')[1] > b.code.split('.')[1]) return -1;
    if (a.code.split('.')[1] < b.code.split('.')[1]) return 1;
    return 0
}

function compareSemester(a, b) {
    var left = a.code.split('.')[2];
    var right = b.code.split('.')[2];
    var l = 0;
    var r = 0;

    if (left === "Winter") l = 1;
    if (left === "Spring") l = 2;
    if (left === "Summer") l = 3;
    if (left === "Fall") l = 4;

    if (right === "Winter") r = 1;
    if (right === "Spring") r = 2;
    if (right === "Summer") r = 3;
    if (right === "Fall") r = 4;

    if (l < r) return 1;
    if (l > r) return -1;
    return 0;
}

function compareName(a, b) {
    return a.code.split('.')[3].localeCompare(b.code.split('.')[3])
}

function sortMostRecent(input) {
    var data = csv.csvParse(fs.readFileSync(input + ".csv", 'utf8'));
    var newData = data.sort(compareSemester);
    var newData = newData.sort(compareYear);
    var newData = newData.sort(compareName);
    fs.writeFileSync(input + "_sorted" + ".csv", csv.csvFormat(newData), 'utf8');
    return input + "_sorted";
}

function removeDuplicatesById(input) {
    var data = csv.csvParse(fs.readFileSync(input + ".csv", 'utf8'));
    var newData = data.filter((e, i, array) => {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (e.id === element.id) {
                if (i === index) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    });
    fs.writeFileSync(input + "_noDupes" + ".csv", csv.csvFormat(newData), 'utf8');
    return input + "_noDupes";
}

function listDiffInstructors(input) {
    var data = csv.csvParse(fs.readFileSync(input + ".csv", 'utf8'));
    var newData = data.filter((e, i, array) => {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (e.code.split('.')[3] === element.code.split('.')[3]) {
                if (e.instructorId === element.instructorId) {
                    if (i === index) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    });
    fs.writeFileSync(input + "_teachers" + ".csv", csv.csvFormat(newData), 'utf8');
    return input + "_teachers";
}

/* get a list of the most recent course taught by each different set of instructors */
/* (keep track of the path so we can use it again) */

/* main list of courses */
// rescue(listDiffInstructors(removeDuplicatesById(sortMostRecent('csvs\\csvOfDoom'))));
convertForCameron('csvs\\csvOfDoom_sorted_noDupes_teachers_saved.csv', 'courses_that_need_saving.csv');

/* courses with a huge list of instructors */
// rescue(listDiffInstructors(removeDuplicatesById(sortMostRecent('csvs\\longInstructors'))));
convertForCameron('csvs\\longInstructors_sorted_noDupes_teachers_saved.csv', 'long_name_saving.csv');
import { resolve } from 'path';

const csv = import('d3-csv');
const https = import('https');

function checkForMatch(enrollmentsList, floaters) {

}

function findFloaters(pathToCSV) {
    var oldCoursesAndTeachers = csv.parse(pathToCSV);
    const inputHeaders = ["code", "id", "name", "instructorId", "instructorName", "InstructorEmail"];
    
    var floaters = [];

    for (let index = 0; index < oldCoursesAndTeachers.length; index++) {
        const element = oldCoursesAndTeachers[index];
        var apiCall = "https://byui.instructure.com/api/v1/users/" + element.instructorId + "/enrollments?per_page=100&type[]=TeacherEnrollment";
        
        https.get(apiCall, (res) => {
            let data = '';
            res.on('data', (c) => {data += c;});
            res.on('end', () => {checkForMatch(JSON.parse(data), floaters);});
        }).on('error', (e) => {console.log("Err: " + e.message);});

    }
}

function produceMasterList(stuff) {
    const csvHeaders = ["orgUnitID", "instructorName", "instructorEmail"];
}
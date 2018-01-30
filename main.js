const asyncLib = require('async');
const agenda = require('./agenda.js');

module.exports = (courseData, finalCallback) => {
    
    agenda.setChildModules(courseData.courseInfo.childModules);
    
    const modules = [
        asyncLib.constant(courseData),
        ...agenda.prepare,
        ...agenda.preImport,
        ...agenda.importCourse,
        ...agenda.postImport,
        ...agenda.cleanUp
    ];

    asyncLib.waterfall(modules, finalCallback);

};
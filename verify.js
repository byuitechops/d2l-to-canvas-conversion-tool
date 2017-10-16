const chalk = require('chalk');

module.exports = (courseObj, callback) => {
    const standardProperties = [
        'report',
        'settings',
        'info',
        'content'
    ];

    const standardInfoProperties = [
        'originalFilepath',
        'unzippedFilepath',
        'altUnzippedFilepath',
        'zippedFilepath',
        'fileName'
    ];

    const standardSettingsProperties = [
        'debug',
        'online',
        'readAll',
        'keepFiles'
    ];

    /* Check if courses top level contains the standard properties */
    standardProperties.forEach((property) => {
        if (!Object.keys(courseObj).includes(property)) {
            callback(`Course object missing property: ${property}`, courseObj);
            return;
        }
    });

    /* Check if Info contains the standard properties */
    standardInfoProperties.forEach((property) => {
        if (!Object.keys(courseObj.info).includes(property)) {
            callback(`Course Info missing property: ${property}`, courseObj);
            return;
        }
    });

    /* Check if Settings contains the standard properties */
    standardSettingsProperties.forEach((property) => {
        if (!Object.keys(courseObj.settings).includes(property)) {
            callback(`Course Settings missing property: ${property}`, courseObj);
            return;
        }
    });

    /* Check if object contains extra properties */
    if (Object.keys(courseObj).length > standardProperties.length ||
        Object.keys(courseObj.info).length > standardInfoProperties.length ||
        Object.keys(courseObj.settings).length > standardSettingsProperties.length) {
        callback(`Course object provided contains extra
              properties it should not have`, courseObj);
        return;
    }

    courseObj.success('verifier', chalk.cyan('Course Object successfully verified!'));
    callback(null, courseObj);
};

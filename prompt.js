var Enquirer = require('enquirer');
var enquirer = new Enquirer();
var agenda = require('./agenda.js');

// Register prompt-list
enquirer.register('radio', require('prompt-radio'));
enquirer.register('password', require('prompt-password'));
enquirer.register('checkbox', require('prompt-checkbox'));
enquirer.register('confirm', require('prompt-confirm'));

/* Platform */
enquirer.question('platform', {
    type: 'radio',
    message: 'Platform:',
    default: 'online',
    choices: [
        'online',
        'pathway',
        'campus'
    ]
});

/* Canvas ID */
enquirer.question('canvasOU', 'Existing Canvas ID (if available):', {
    errorMessage: 'Must be a number!',
    validate: (input) => {
        return /\d*/.test(input);
    }
});

/* Brightspace OU */
enquirer.question('D2LOU', 'Brightspace OU:', {
    errorMessage: 'Must be a number!',
    default: '340002',
    validate: (input) => {
        return /\d+/.test(input);
    }
});

/* User Username */
enquirer.question('username', 'Username:', {
    errorMessage: 'Cannot be blank!',
    validate: (input) => {
        return input != '';
    },
    when: () => {
        return !process.argv.includes('-e');
    }
});

/* User Password */
enquirer.question('password', {
    type: 'password',
    message: 'Password:',
    errorMessage: 'Cannot be blank!',
    validate: (input) => {
        return input != '';
    },
    when: () => {
        return !process.argv.includes('-e');
    }
});

enquirer.question('preImportModules', {
    type: 'checkbox',
    message: 'Pre-Import Child Modules:',
    default: () => {
        var defaultMods = agenda.optionalPreImport.filter(item => item.default.includes(enquirer.answers.platform));
        return defaultMods.map(item => item.title);
    },
    choices: agenda.optionalPreImport.map(item => item.title)
});

enquirer.question('postImportModules', {
    type: 'checkbox',
    message: 'Post-Import Child Modules:',
    default: () => {
        var defaultMods = agenda.optionalPostImport.filter(item => item.default.includes(enquirer.answers.platform));
        return defaultMods.map(item => item.title);
    },
    choices: agenda.optionalPostImport.map(item => item.title),
});

enquirer.question('cleanUpModules', {
    type: 'checkbox',
    message: 'Cleanup Child Modules:',
    default: [
        'remove-files'
    ],
    choices: agenda.optionalCleanup
});

enquirer.question('lessonFolders', {
    type: 'input',
    message: 'Do you want to create Lesson Folders in media/documents? (y/n)',
    errorMessage: 'Must be "y" or "n"',
    validate: input => /[yn]/.test(input),
    when: (answers) => {
        return answers.postImportModules.includes('reorganize-file-structure');
    },
    transform: input => input === 'y'
});

/* Ask the above questions! */
module.exports = enquirer.ask()
    .catch(console.error);


/** Choice list
 * 
 * SETTINGS
 *      Platform
 *          - Online (default)
 *          - Pathway
 *          - Campus
 *      Existing Canvas ID
 *          (provided by user)
 *      D2L OU
 *          (provided by user)
 *      Username
 *          (provided by user)
 *      Password
 *          (provided by user)
 *      
 * CHILD MODULES
 *      PRE-IMPORT
 *          - Choices pulled from agenda.js
 *          - Defaults determined by platform and agenda.js
 * 
 *      POST-IMPORT
 *          - Choices pulled from agenda.js
 *          - Defaults determined by platform and agenda.js
 * 
 *      CLEANUP
 *          - Choices pulled from agenda.js
 *          - Defaults determined by platform and agenda.js
 * 
 * OPTIONS
 *      Do you want lesson folders created in media/documents?
 *          - Yes/No
 
 */
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
        return !isNaN(+input);
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

enquirer.question('options', {
    type: 'checkbox',
    message: 'Which settings would you like to enable?',
    default: () => {
        var defaultMods = agenda.options.filter(item => item.default.includes(enquirer.answers.platform));
        return defaultMods.map(item => item.description);
    },
    choices: agenda.options.map(option => option.description),
    transform: choices => {
        return choices.map(choice => {
            var option = agenda.options.find(option => option.description === choice);
            return option.name;
        });
    }
});

/* Ask the above questions! */
module.exports = enquirer.ask()
    .catch(console.error);
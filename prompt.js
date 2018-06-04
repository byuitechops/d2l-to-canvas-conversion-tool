var agenda = require('./agenda.js');
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

/* Returns the optional modules for a category */
function getOptionalModules(modules) {
    return modules.reduce((acc, module) => {
        if (module.platform[enquirer.answers.platform] !== 'required' &&
            module.platform[enquirer.answers.platform] !== 'disabled') {
            return acc.concat(module.name);
        } else return acc;
    }, []);
}

/* Returns the default modules for a category */
function getDefaultModules(modules) {
    return modules.reduce((acc, module) => {
        if (module.platform[enquirer.answers.platform] === 'default') {
            return acc.concat(module.name);
        } else return acc;
    }, []);
}

function buildFullAgenda(answers) {
    return new Promise(async (resolve, reject) => {

        let allModules = [
            ...agenda.preparation,
            ...agenda.preImport,
            ...agenda.import,
            ...agenda.postImport,
            ...agenda.cleanUp
        ];

        let moduleList = allModules.filter(module => {
            if (module.platform[answers.platform] === 'required') {
                return true;
            } else if (module.platform[answers.platform] === 'disabled') {
                return false;
            } else if (answers[module.type].includes(module.name)) {
                return true;
            }
        });

        /* Remove any modules that do not have their required modules running before them */
        moduleList = moduleList.filter(module => module.requiredModules.every(requiredModule => moduleList.map(m => m.name).includes(requiredModule)));

        let actionSeriesList = agenda.actionSeries.filter(grandchild => {
            if (grandchild.platform[answers.platform] === 'required') {
                return true;
            } else if (grandchild.platform[answers.platform] === 'disabled') {
                return false;
            } else if (answers.actionSeries.includes(grandchild.name)) {
                return true;
            }
        });

        /* Remove any grandchildren that do not have their required modules running before them */
        actionSeriesList = actionSeriesList.filter(module => module.requiredModules.every(requiredModule => moduleList.map(m => m.name).includes(requiredModule)));

        /* Gather options to prompt the user about */
        answers.options = [];
        for (var x = 0; x < moduleList.length; x++) {
            for (var i = 0; i < moduleList[x].options.length; i++) {
                enquirer.question(moduleList[x].options[i].name, {
                    type: 'confirm',
                    message: `${moduleList[x].name} | ${moduleList[x].options[i].name}`,
                    default: moduleList[x].options[i][answers.platform],
                });

                await enquirer.ask(moduleList[x].options[i].name)
                    .then(answer => {
                        answers.options.push({
                            name: moduleList[x].options[i].name,
                            value: answer[moduleList[x].options[i].name]
                        });
                    })
                    .catch(console.error);
            }
        }

        moduleList.forEach(module => module.run = require(module.name));
        actionSeriesList = actionSeriesList.map(grandchild => grandchild.name);

        answers.fullAgenda = moduleList;
        answers.fullActionSeries = actionSeriesList;
        resolve(answers);
    });
}

/* Register Question Types */
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

/* Brightspace OU */
enquirer.question('D2LOU', 'Brightspace OU:', {
    errorMessage: 'Must be a number!',
    default: '340002',
    validate: (input) => {
        return !isNaN(+input);
    }
});

module.exports = async () => {
    let platform = await enquirer.ask('platform');
    let D2LOU = await enquirer.ask('D2LOU');

    enquirer.question('preparation', {
        type: 'checkbox',
        message: 'Preparation Shell Modules:',
        default: getDefaultModules(agenda.preparation),
        choices: getOptionalModules(agenda.preparation),
        when: (answers) => getOptionalModules(agenda.preparation).length > 0
    });

    enquirer.question('preImport', {
        type: 'checkbox',
        message: 'Pre-Import Child Modules:',
        default: getDefaultModules(agenda.preImport),
        choices: getOptionalModules(agenda.preImport),
        when: (answers) => getOptionalModules(agenda.preImport).length > 0
    });

    enquirer.question('import', {
        type: 'checkbox',
        message: 'Import Shell Modules:',
        default: getDefaultModules(agenda.import),
        choices: getOptionalModules(agenda.import),
        when: (answers) => getOptionalModules(agenda.import).length > 0
    });

    enquirer.question('postImport', {
        type: 'checkbox',
        message: 'Post-Import Child Modules:',
        default: getDefaultModules(agenda.postImport),
        choices: getOptionalModules(agenda.postImport),
        when: (answers) => getOptionalModules(agenda.postImport).length > 0
    });

    enquirer.question('actionSeries', {
        type: 'checkbox',
        message: 'Action-Series Grandchildren:',
        default: getDefaultModules(agenda.actionSeries),
        choices: getOptionalModules(agenda.actionSeries),
        when: (answers) => getOptionalModules(agenda.actionSeries).length > 0
    });

    enquirer.question('cleanUp', {
        type: 'checkbox',
        message: 'Clean-Up Child Modules:',
        default: getDefaultModules(agenda.cleanUp),
        choices: getOptionalModules(agenda.cleanUp),
        when: (answers) => getOptionalModules(agenda.cleanUp).length > 0
    });

    /* Instructor Full Name for Campus */
    enquirer.question('instructorName', 'Instructor Full Name:', {
        errorMessage: 'Cannot be blank!',
        validate: (input) => {
            return input != '';
        },
        when: (answers) => answers.platform === 'campus'
    });

    /* User Username */
    enquirer.question('username', 'Username:', {
        errorMessage: 'Cannot be blank!',
        validate: (input) => {
            return input != '';
        },
        when: (answers) => answers.postImport.includes('groups-bridge') || !process.argv.includes('-e')
    });

    /* User Password */
    enquirer.question('password', {
        type: 'password',
        message: 'Password:',
        errorMessage: 'Cannot be blank!',
        validate: (input) => {
            return input != '';
        },
        when: (answers) => answers.postImport.includes('groups-bridge') || !process.argv.includes('-e')
    });

    await enquirer.ask('preparation');
    await enquirer.ask('preImport');
    await enquirer.ask('import');
    await enquirer.ask('postImport');
    await enquirer.ask('actionSeries');
    await enquirer.ask('cleanUp');
    await buildFullAgenda(enquirer.answers);
    await enquirer.ask('instructorName');
    await enquirer.ask('username');
    await enquirer.ask('password');

    return enquirer.answers;
};
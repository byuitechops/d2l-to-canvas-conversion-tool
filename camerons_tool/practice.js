const inquirer = require('inquirer');
const chalk = require('chalk');


async function getUserInfo() {

    var warning = "========================================================================\n"+ 
                    "  Before you continue, please make sure that you have set your \n  Canvas API Token as an enviroment variable called CANVAS_API_TOKEN.\n" +
    "  Please refer to the canvas api wrapper documentation on how to do this.\n  Press enter to continue or ctl+c to quick and set your token.\n" + 
    "  ========================================================================\n"

    console.log(chalk.blue("TACO"))

    var questions = [{
            type: 'input',
            name: 'warning',
            message: chalk.red(warning),
            default: "Press ENTER to coninue :D"
        },
        {
            type: 'input',
            name: 'csvLocation',
            message: "Where is the CSV located"
        },
        {
            type: 'input',
            name: 'username',
            message: "What's your Brightspace CCT username?",
            default: process.env.MYUSERNAME || ""
        },
        {
            type: 'password',
            name: 'password',
            message: "What's your Brightspace CCT password?",
            mask: '*',
            default: process.env.MYPASSWORD || ""
        }
    ]

    return await inquirer.prompt(questions).then(answers => {
        return answers
    });

}


module.exports = getUserInfo
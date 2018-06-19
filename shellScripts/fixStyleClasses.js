// This is a quickfix for ECON 151 (and possibly other courses) where the styling classes did not insert correctly

const Enquirer = require('enquirer');
const enquirer = new Enquirer();
const canvas = require('canvas-api-wrapper');

enquirer.question('canvasID', 'Canvas Course ID:');
enquirer.question('styleClass', 'Correct Style Class:');

async function fixClasses(item, courseClass) {
    try {
        if (item.getHtml()) {
            const reg1 = /(<p>)?&lt;\sdiv\sclass="byui\s.*"\s&gt;\s&lt;\sdiv\sclass="byui\s.*"\s&gt;(<\/p>)?/gi;
            const reg2 = /(<p>)?&lt;\sdiv\sclass="byui\s.*"\s&gt;(<\/p>)?/gi;
            var html = item.getHtml();
            let pass1 = reg1.test(html);
            let pass2 = reg2.test(html);

            if (pass1) {
                html = html.replace(reg1, `<div class="byui ${courseClass}">`) + '</div>';
            } else if (pass2) {
                html = html.replace(reg2, `<div class="byui ${courseClass}">`);
            }
            if (pass1 === true || pass2 === true) {
                item.setHtml(html);
                await item.update();
                console.log(item.getTitle() + ' has been updated.');
            }

        }
    } catch (e) {
        // console.error(e);
    }
}

enquirer.ask()
    .then(async (answers) => {
        try {

            let course = canvas.getCourse(answers.canvasID);
            await course.getComplete();

            var all = course.getSubs();

            all = all.reduce((acc, sub) => [...acc, ...sub], []);
            let questions = course.quizzes.reduce((acc, quiz) => [...acc, ...quiz.questions], []);
            all = [...all, ...questions];

            for (let x = 0; x < all.length; x++) {
                fixClasses(all[x], answers.styleClass);
            }
            console.log('Complete');
        } catch (e) {
            console.error(e);
        }
    })
    .catch(console.error);
const canvas = require('canvas-api-wrapper');
const cheerio = require('cheerio');

module.exports = async (courseObject, stepCallback) => {

    function identifyFileLinks(acc, item) {

        // src, href, type for module items
        var fileId;

        if (item.getHtml()) {
            var $ = cheerio.load(item.getHtml());
            var elements = [...$('[href]'), ...$('[src]')];
            elements.forEach(el => {
                let link = '';
                if ($(el).attr('href')) {
                    link = $(el).attr('href');
                } else {
                    link = $(el).attr('src');
                }
                if (link.includes('/files/')) {
                    fileId = link.split('/files/')[1].split('/')[0];
                }
            });
            if (fileId) {
                return [...acc, fileId];
            }
        }
    }

    var course = canvas.getCourse(courseObject.info.canvasOU);

    await course.pages.getComplete();
    await course.quizzes.getComplete();
    await course.modules.getComplete();
    await course.discussions.get();
    await course.assignments.get();

    let allItems = course.getSubs().reduce((acc, sub) => acc.concat(sub));
    let questions = course.quizzes.reduce((acc, quiz) => [...acc, ...quiz.questions], []);
    let moduleItems = course.modules.reduce((acc, module) => [...acc, ...module.items]);
    allItems = [...allItems, ...questions];

    await course.files.get();

    allItems.reduce(identifyFileLinks, []);

};
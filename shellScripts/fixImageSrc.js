const cheerio = require('cheerio');
const Enquirer = require('enquirer');
const enquirer = new Enquirer();
const canvas = require('canvas-api-wrapper');

var course;

enquirer.question('canvasID', 'Canvas Course ID:');

async function fixClasses(item, courseClass) {
    try {
        if (item.getHtml()) {
            let $ = cheerio.load(item.getHtml());
            
            let imgs = $('img');
            
            if (imgs.length > 0) {
                imgs.each((i, img) => {
                    
                    let src = $(img).attr('src');
                    if (src && src.includes('/file_contents/course%20files/')) {
                        
                        let filepathPieces = src.split('/');
                        // get the file name
                        let filename = filepathPieces.pop().replace('%20', ' ');
                        // get the file parent folder
                        let parentFolder = filepathPieces.pop().replace('%20', ' ');;

                        console.log(filename, parentFolder)
                        
                        // get the file id, match parent
                        let fileItem = course.files.find(file => {
                            
                            let folderItem = course.folders.find(folder => {
                                return folder.name === parentFolder;
                            });
                            return (file.filename === filename && folderItem.id === file.folder_id);
                        });

                        if (fileItem) {
                            // build new link
                            let newSrc = `/courses/${enquirer.answers.canvasID}/files/${fileItem.id}`
                            // set src attr to new link
                            $(img).attr('src', newSrc);
                            console.log(item.getTitle() + ' has been updated.');
                            item.setHtml($.html());
                        }
                    }
                });
            }
        }
    } catch (e) {
        // console.error(e);
    }
}





enquirer.ask()
    .then(async (answers) => {
        try {

            course = canvas.getCourse(answers.canvasID);
            await course.getComplete();
            if (!course.files) {
                await course.files.get();
                await course.folders.get();
            }
            var all = course.getSubs();

            all = all.reduce((acc, sub) => [...acc, ...sub], []);
            let questions = course.quizzes.reduce((acc, quiz) => [...acc, ...quiz.questions], []);
            all = [...all, ...questions];

            for (let x = 0; x < all.length; x++) {
                fixClasses(all[x], answers.styleClass);
            }
            await course.update();
            console.log('Complete');
        } catch (e) {
            console.error(e);
        }
    })
    .catch(console.error);
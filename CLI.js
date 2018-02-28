const prompt = require('./prompt.js');
const downloader = require('d2l-course-downloader');
const main = require('./main.js');

/* Prompt the user for the needed information */
prompt
    .then(downloader)
    .then(main)
    .catch(console.error);
/* eslint no-console:0 */

const prompt = require('./prompt.js');
const downloader = require('d2l-course-downloader');
const main = require('./main.js');
const folderSetup = require('d2l-to-canvas-conversion-folder-setup');

/* Prompt the user for the needed information */

prompt()
    .then(folderSetup)
    .then(downloader)
    .then(main)
    .catch(console.error);
/* eslint no-console:0 */

const asyncLib = require('async'),
    chalk = require('chalk'),
    canvas = require('canvas-wrapper'),
    prompt = require('prompt');

function deleteEvent(event, cb) {
    canvas.delete(`/api/v1/calendar_events/${event}`, (err, result) => {
        if (err) {
            console.error(chalk.red(`Error deleting event with id: ${result.id}\n${err}`));
            return;
        }
        console.log(chalk.green(`Successfully deleted event with id: ${result.id}`));
        cb(null);
    });
}


function getEventIds(courseID) {
    // var eventIDs = await getEventIds(courseID);
    canvas.get(`/api/v1/calendar_events?type=event&context_codes[]=course_${courseID}&all_events=1&excludes[]=assignment&excludes[]=description&excludes[]=child_events%27`, (err, allEvents) => {
        if (err) {
            console.error(err);
            return;
        }

        var eventIDs = allEvents.reduce((ids, event) => {
            if (event.start_at == null && event.end_at == null) ids.push(event.id);
            return ids;
        }, []);

        console.log('eventIDs', eventIDs);
        asyncLib.eachLimit(eventIDs, 5, deleteEvent, (err) => {
            if (err) {
                console.error(chalk.red(err));
                return;
            }
            console.log(chalk.blue('Done!'));
        });
    });
}

function getCourseID() {
    prompt.start();
    prompt.get(['Canvas Course ID'], (promptErr, courseID) => {
        if (promptErr) {
            console.error(chalk.red(promptErr));
            return;
        }

        getEventIds(courseID);
    });
}

function main() {
    /* get course OU if not included */
    if (!process.argv[2]) {
        getCourseID();
    } else {
        // TODO validate input
        var courseID = process.argv[2];
        getEventIds(courseID);
    }
}

main();
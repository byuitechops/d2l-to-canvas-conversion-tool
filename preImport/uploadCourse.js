/*eslint-env node*/
/*eslint no-console:0*/

'use-strict';

const variables = require('../variables.js'),
    chalk = require('chalk'),
    auth = require('../auth.json'),
    fs = require('fs'),
    request = require('request');

var returnCallback;

/*****************************
 * passes all fatal errors to 
 * returnCallback
 ****************************/
function throwError(err, message) {
    returnCallback(err);
}

/**************************************
 * GETs the status of the upload ONCE
 *************************************/
function checkProgress(progressUrl) {
    console.log("Canvas migration status:");
    var checkLoop = setInterval(() => {
        request.get(progressUrl, function (err, response, body) {
            if (err) {
                throwError(err, "from checkProgress");
                return;
            } else {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    console.error(chalk.red(e), 'convert progress JSON');
                }
                // console.log('\n DA PROGRESS:\n', JSON.parse(body));
                console.log(chalk.blue('Status:'), body.workflow_state);
                if (body.workflow_state === 'completed') {
                    clearInterval(checkLoop);
                    returnCallback();
                } else if (body.workflow_state === 'failed' || body.workflow_state === 'waiting_for_select') {
                    clearInterval(checkLoop);
                    console.log("Something broke");
                }
            }
        }).auth(null, null, true, auth.token);
    }, 5000);
}

/*********************************************
 * GETs migration object so we can
 * know the progressURL
 *******************************************/
function getMigration(body, migrationId) {
    //console.log("Retrieving Migration", migrationId);

    var url = 'https://byui.instructure.com/api/v1/courses/' + variables.getCourseId() + '/content_migrations/' + migrationId;
    request.get(url, function (err, response, body) {
        if (err) {
            throwError(err, 'getting migration');
            return;
        } else {
            //console.log(chalk.green('Retrieved migration'));
            try {
                body = JSON.parse(body);
            } catch (e) {
                throwError(e, 'convert migration JSON');
                return;
            }

            if (body.errors) {
                //console.log(chalk.red(JSON.stringify(body.errors.message)));
                throwError(JSON.stringify(body.errors));
            } else{
                checkProgress(body.progress_url);
            }

        }
    }).auth(null, null, true, auth.token);
}

/**********************************
 * Makes all post requests
 **********************************/
function postRequest(url, content, authRequired, cb, custom) {
    var contentType = content.type,
        postOptions = {
            url: url
        };
    delete content.type;

    if (contentType === "multipart/form-data") {
        postOptions.formData = content;
    } else if (Object.keys(content).length > 0) {
        postOptions.form = content;
    }

    function postCallback(err, response, body) {
        if (err) {
            throwError(err, 'postCB');
            return;
        } else {
            //console.log('Content Type:', contentType);
            if (contentType === 'multipart/form-data') {
                cb(response, custom);
            } else {
                try {
                    body = JSON.parse(body);
                    cb(body, custom);
                } catch (e) {
                    throwError(e, 'postCB convert body object');
                    return;
                }
            }
        }
    }
    if (authRequired === true)
        request.post(postOptions, postCallback).auth(null, null, true, auth.token);
    else
        request.post(postOptions, postCallback);
}

/**************************************************
 * Confirms the upload and calls getMigration
 **************************************************/
function confirmUpload(response, migrationId) {
    //console.log(chalk.yellow('Upload Confirmed. Redirect URL obtained'));

    var redirectUrl = response.headers.location;

    postRequest(redirectUrl, {
        type: 'application/x-www-form-urlencoded'
    }, true, getMigration, migrationId);
}

/**************************************************************
 * reads in the zip and uploads it to the URL provided by
 * canvas. Calls postRequest with confirmUpload as the callback
 **************************************************************/
function uploadZip(body, fileName) {
    //console.log(chalk.yellow('Migration Created'));

    var migrationId = body.id,
        preAttachment = body.pre_attachment;
    
    variables.setMigrationId(migrationId);

    preAttachment.upload_params.type = 'multipart/form-data';
    preAttachment.upload_params.file = fs.createReadStream("D2LReady/" + fileName);

    postRequest(preAttachment.upload_url, preAttachment.upload_params, false, confirmUpload, migrationId);
}

/******************************************************************
 * sets the data for the POST which informs canvas of the upload.
 * sends the request via postRequest with uploadZIP as the callback
 ******************************************************************/
exports.run = (returnCB) => {
    returnCallback = returnCB;

    var courseId = variables.getCourseId(),
        fileName = variables.getFilename();

    var postBody = {
            type: 'application/x-www-form-urlencoded', //to be removed if postRequest() isn't used
            migration_type: 'd2l_exporter',
            'pre_attachment[name]': fileName,
            'pre_attachment[size]': '34930210',
            'pre_attachment[content_type]': 'application/zip',
            'settings[folder_id]': auth.parentFolderId
        },
        url = 'https://byui.instructure.com/api/v1/courses/' + courseId + '/content_migrations';

    postRequest(url, postBody, true, uploadZip, fileName);
}

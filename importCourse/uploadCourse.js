/*eslint-env node, es6*/
/*eslint no-console:0*/
/*eslint no-inner-declarations:0*/

'use-strict';

const chalk = require('chalk'),
   auth = require('../auth.json'),
   fs = require('fs'),
   request = require('request');

/**************************************
 * uploads the zip to a canvas course
 * saves migrationId to course object
 **************************************/
module.exports = function (course, stepCallback) {
   course.addModuleReport("uploadCourse");

   /****************************************
    * Add location to errs and pass them up
    ***************************************/
   function throwError(err) {
      course.throwFatalErr("uploadCourse", err);
      stepCallback(err, course);
   }

   /**************************************
    * GETs the status of the upload ONCE
    *************************************/
   function checkProgress(progressUrl) {
      console.log("\nCanvas migration status:");
      var checkLoop = setInterval(() => {
         request.get(progressUrl, function (err, response, body) {
            if (err) {
               throwError(err);
               return;
            } else {
               try {
                  body = JSON.parse(body);
               } catch (e) {
                  throwError(e);
                  return;
               }
               console.log(chalk.blue('Import Progress:'), body.workflow_state);
               if (body.workflow_state === 'completed') {
                  clearInterval(checkLoop);
                  //course.report.moduleLogs["importCourse"].changes.push('Zip successfully uploaded to Canvas');
                  course.success('uploadCourse', 'Zip successfully uploaded to Canvas');
                  stepCallback(null, course);
                  return;
               } else if (body.workflow_state === 'failed' || body.workflow_state ===
                  'waiting_for_select') {
                  clearInterval(checkLoop);
                  throwError(new Error(
                     "Unknown error occured. Please check the status of the migration via Canvas UI"
                  ));
               }
            }
         }).auth(null, null, true, auth.token);
      }, 5000);
   }

   /*********************************************
    * GETs migration object so we can
    * know the progressURL
    *******************************************/
   function getMigration(body) {
      //console.log("Retrieving Migration");

      var url = 'https://byui.instructure.com/api/v1/courses/' + course.info.canvasOU +
         '/content_migrations/' + course.info.migrationID;
      request.get(url, function (err, response, body) {
         if (err) {
            throwError(err);
            return;
         } else {
            //console.log(chalk.green('Retrieved migration'));
            try {
               body = JSON.parse(body);
            } catch (e) {
               throwError(e);
               return;
            }

            if (body.errors) {
               //console.log(chalk.red(JSON.stringify(body.errors.message)));
               throwError(new Error(JSON.stringify(body.errors)));
               return;
            } else {
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
            throwError(err);
            return;
         } else {
            //console.log('Content Type:', contentType);
            if (contentType === 'multipart/form-data') {
               cb(response, custom);
            } else {
               try {
                  body = JSON.parse(body);
               } catch (e) {
                  throwError(e);
                  return;
               }
               cb(body, custom);
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
   function confirmUpload(response) {
      //console.log(chalk.yellow('Upload Confirmed. Redirect URL obtained'));

      var redirectUrl = response.headers.location;

      postRequest(redirectUrl, {
         type: 'application/x-www-form-urlencoded'
      }, true, getMigration);
   }

   /**************************************************************
    * reads in the zip and uploads it to the URL provided by
    * canvas. Calls postRequest with confirmUpload as the callback
    **************************************************************/
   function uploadZip(body) {
      //console.log(chalk.yellow('Migration Created'));

      //course.info.migrationID = body.id
      course.newInfo('migrationID', body.id);
      var preAttachment = body.pre_attachment;

      preAttachment.upload_params.type = 'multipart/form-data';
      preAttachment.upload_params.file = fs.createReadStream(course.info.zippedFilepath);

      postRequest(preAttachment.upload_url, preAttachment.upload_params, false, confirmUpload);
   }

   /******************************************************************
    * sets the data for the POST which informs canvas of the upload.
    * sends the request via postRequest with uploadZIP as the callback
    ******************************************************************/
   var postBody = {
         type: 'application/x-www-form-urlencoded',
         migration_type: 'd2l_exporter',
         'pre_attachment[name]': course.info.zippedFilepath.split("\\")[course.info.zippedFilepath.split(
            "\\").length - 1],
         'pre_attachment[size]': '34930210',
         'pre_attachment[content_type]': 'application/zip',
         'settings[folder_id]': auth.parentFolderId
      },
      url = 'https://byui.instructure.com/api/v1/courses/' + course.info.canvasOU + '/content_migrations';

   postRequest(url, postBody, true, uploadZip);
}

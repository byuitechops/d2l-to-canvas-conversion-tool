/*eslint-env node, es6*/
/*eslint no-unused-vars:1*/
/*eslint no-console:0*/

const request = require('request');
const auth = require('../auth.json');


/* Always set per_page? */

/*************************************
 * handles calls where pagination may
 * be necessary. returns to cb given
 * to original function
 ************************************/
function paginate(response, caller, data, cb) {
   if (response.headers.link == undefined) {
      // No pagination: no worries
      cb(null, data);
   } else {
      // pagination will occur!
      // Canvas return string of XML, filter to XML tag
      var link = response.headers.link.split(',').filter((link) => {
         return link.includes('next');
      })[0];
      // filter <> and other characters out of url
      if (link == undefined || link.length == 0) {
         cb(null, data);
      } else {
         var pageinateUrl = link.split('<')[1].split('>')[0]
         caller(pageinateUrl, cb, data);
      }
   }
}


/**************************************
 * GET operation. returns err, data
 *************************************/
const getRequest = function (url, cb, data) {
   if (data == undefined) data = [];
   request.get(url, (err, response, body) => {
      if (err) {
         cb(err, response);
         return;
      }
      data = data.concat(JSON.parse(body));
      paginate(response, getRequest, data, cb);
   }).auth(null, null, true, auth.token);
}

/*******************************************
 * PUT request. requires a url & putObject
 * returns err, response
 ******************************************/
const putRequest = function (url, putObj, cb) {
   request.put({
      url: url,
      form: putObj
   }, (err, response, body) => {
      if (err) {
         cb(err, response);
         return;
      }
      cb(null, response);
   }).auth(null, null, true, auth.token);
}

/****************************************
 * POST request. takes URL and postObj.
 * returns err, response
 ***************************************/
const postRequest = function (url, postObj, body, cb) {
   request.post({
      url: url,
      form: postObj
   }, (err, response, body) => {
      if (err) {
         cb(err, null);
         return;
      }
      cb(null, response);

   }).auth(null, null, true, auth.token);

}

/************************************************
 * DELETE operation. returns err, statusCode.
 * no pagination
 ************************************************/
const deleteRequest = function (url, body, cb) {
   request.delete(url, (err, response, body) => {
      if (err) {
         cb(err, response);
         return;
      }
      cb(null, response.statusCode);
   });
}


module.exports = {
   get: getRequest,
   put: putRequest,
   post: postRequest,
   delete: deleteRequest
}

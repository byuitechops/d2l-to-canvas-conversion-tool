/*eslint-env node, es6*/
/*eslint no-unused-vars:1*/
/*eslint no-console:0*/

const request = require('request');
const auth = require('../auth.json');


/* Always set per_page? */
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
 * get operation. returns err, data
 *************************************/
const getRequest = function (url, cb, data) {
   if(data == undefined) data = [];
   request.get(url, (err, response, body) => {
      if (err) {
         cb(err, response);
         return;
      }
      data = data.concat(JSON.parse(body));
      paginate(response, getRequest, data, cb);
   }).auth(null, null, true, auth.token);
}

const putRequest = function (url, cb) {
   request.put
}

const postRequest = function (url, body, cb) {

}

/************************************************
 * delete operation. returns err, statusCode.
 * no pagination
 ************************************************/
const deleteRequest = function (url, body, cb) {
   request.delet(url, (err, response, body) => {
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


/*
getRequest('https://byui.instructure.com/api/v1/accounts/1/admins', function (err, response) {
   if (err)
      console.error(err);
   else{
      console.log(response);
      console.log(response.length);
   }
})
*/

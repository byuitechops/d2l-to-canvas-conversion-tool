/*eslint-env node, es6*/
/*eslint no-unused-vars:1*/
/*eslint no-console:0*/

const request = require('request');
const auth = require('./auth.json');


/* Always set per_page? */

/******************************
 * Adds protocol and domain to 
 * url if missing
 ******************************/
function urlCleaner(url) {
    if (url.search(/https?:\/\/byui.instructure.com/) >= 0) {
        return url;
    } else {
        url = `https://byui.instructure.com${url}`;
        return url;
    }
}

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
    url = urlCleaner(url);
    request.get(url, (err, response, body) => {
        if (err) {
            cb(err, null);
            return;
        } else if (response.statusCode !== 200) {
            cb(new Error(`Status Code: ${response.statusCode}`, null));
            return;
        }
        try{
            body = JSON.parse(body);
        } catch (e){
            cb(e, null);
            return;
        }
        data = data.concat(body);
        paginate(response, getRequest, data, cb);
    }).auth(null, null, true, auth.token);
}

/*******************************************
 * PUT request. requires a url & putObject
 * returns err, response
 ******************************************/
const putRequest = function (url, putObj, cb) {
    url = urlCleaner(url);
    request.put({
        url: url,
        form: putObj
    }, (err, response, body) => {
        if (err) {
            cb(err, response);
            return;
        } else if (response.statusCode !== 200) {
            cb(new Error(`Status Code: ${response.statusCode}`, null));
            return;
        } try {
            body = JSON.parse(body);
        } catch (e) {
            cb(e, null);
            return;
        }
        cb(null, body);
    }).auth(null, null, true, auth.token);
}

/****************************************
 * POST request. takes URL and postObj.
 * returns err, response
 ***************************************/
const postRequest = function (url, postObj, body, cb) {
    url = urlCleaner(url);
    request.post({
        url: url,
        form: postObj
    }, (err, response, body) => {
        if (err) {
            cb(err, null);
            return;
        } else if (response.statusCode !== 200) {
            cb(new Error(`Status Code: ${response.statusCode}`, null));
            return;
        }
        try {
            body = JSON.parse(body);
        } catch (e) {
            cb(e, null);
            return;
        }
        cb(null, body);

    }).auth(null, null, true, auth.token);

}

/************************************************
 * DELETE operation. returns err, response.
 * no pagination
 ************************************************/
const deleteRequest = function (url, cb) {
    url = urlCleaner(url);
    request.delete(url, (err, response, body) => {
        if (err) {
            cb(err, response);
            return;
        } else if (response.statusCode !== 200) {
            cb(new Error(`Status Code: ${response.statusCode}`, null));
            return;
        }
        try {
            body = JSON.parse(body);
        } catch (e) {
            cb(e, null);
            return;
        }
        cb(null, body);
    }).auth(null, null, true, auth.token);
}

module.exports = {
    get: getRequest,
    put: putRequest,
    post: postRequest,
    delete: deleteRequest
}

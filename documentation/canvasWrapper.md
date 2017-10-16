# Canvas Wrapper #
The canvas Wrapper `canvas.js` contains the basic crud operations (PUT, POST, GET, DELETE). 
If there are any API calls we fin ourself frequently making, they will be added to the wrapper. 
This is in an effort to simplify the child modules and reduce code redundancy. 
Parameters for GET and DELETE url's must be appended before being sent to the wrapper.
The wrapper allows the user to input the full URL or just the path. 


Require the wrapper:

`const canvas = require('../canvas.js')`


## GET ##
Handles pagination. Takes a url and a callback. 
```
canvas.get(url, (err, data) => {
});
```
Returns err and data. Data is an array of parsed JSON objects that were returned from the server.

## PUT ##
Doesn't handle pagination. putObj is an object that contains any parameters required by canvas for the call.
```
var putObj = {event: hide_final_grades: true };
canvas.put(url, putObj, (err, body) => {
});
```
Returns err and body. body is the parsed body of the API call.

## POST ##
Pretty much the same as PUT...
```
var postObj = {html: "!DOCTYPE HTML..." };
canvas.post(url, postObj, (err, body) => {
});
```

## DELETE ##
Pretty much the same as GET... but it returns body instead of data.
```
canvas.delete(url, (err, body) => {
});
```
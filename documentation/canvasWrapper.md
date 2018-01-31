# Canvas Wrapper #
The canvas Wrapper simplifies calls to the Canvas API byproviding shorthands for the basic crud operations (PUT, POST, GET, DELETE). 
This is in an effort to simplify the child modules and reduce code redundancy. 
Parameters for GET and DELETE requests must be appended to the URL/ URI before being sent to the wrapper.
The wrapper allows the user to input the full URL or just the path.
The wrapper requires auth.json (which contain a userId & auth token) to exist 2 directories up from the canvas wrapper. 
This is to make the wrapper easier to use in the D2L to Canvas conversion tool.
In addition to the basic CRUD operations, the wrapper now contains getters for the following:
* Pages
* Assignments
* Quizzes
* Modules
* Files

# Usage #
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

## Getters ##
There are getters built in for common items. 

General getters take a course ID
* getModules
* getPages
* getAssignments
* getDiscussions
* getFiles
```
canvas.getModules(courseID, (err, modules) => {
});

```
Specific item getters require a course ID and the Id of their parent container
* getModuleItems
* getQuizQuestions
```
canvas.getModuleItems(courseId, moduleId (err, moduleItems) => {
});
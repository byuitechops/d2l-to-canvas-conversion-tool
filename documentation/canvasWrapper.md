# Canvas Wrapper #
The canvas Wrapper simplifies calls to the Canvas API byproviding shorthands for the basic crud operations (POST, GET, PUT, DELETE). 
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
``` js
const canvas = require('../canvas.js')
```


## GET ##
Get is used to retrieve information from a server. Parameters are sent as part of the URL.
Handles pagination. Takes a url and a callback. 
### canvas.get(url: String, callback: Function)
``` js
canvas.get(url, (err, data) => {
});
```
Returns err and data. Data is an array of parsed JSON objects.


## POST ##
Post is used to create new objects on a server. Parameters are wrapped in an object sent as the second parameter.
Pagination not required.
### canvas.post(url: String, requestParameters: Object, callback: Function)
``` js
var postObj = {html: "!DOCTYPE HTML..." };
canvas.post(url, postObj, (err, body) => {
});
```

## PUT ##
Put is used to update existing objects on a server. Parameters are wrapped in an object sent as the second parameter.
Pagination not required.
### canvas.post(url: String, requestParameters: Object, callback: Function)
``` js
var putObj = {event: hide_final_grades: true };
canvas.put(url, putObj, (err, body) => {
});
```
Returns err and body. body is the parsed body of the API call.


## DELETE ##
Delete is used to remove information from a server. Parameters are sent as part of the URL.
Pagination not required
### canvas.delete(url: String, callback: Function)
``` js
canvas.delete(url, (err, body) => {
});
```



## Helper Functions (GET) ##
We include helper functions to 'GET' items that are frequently used by the conversion tool. General Getters retrieve items that live at the course level and only require a course id. Specific getters retrieve items that live below another item type, and therefore require the id of their parent in addition to the course id

## General Getters
* getModules
* getPages
* getAssignments
* getDiscussions
* getFiles

### canvas.getModules(courseId: String, callback: Function)
``` js
canvas.getModules(courseID, (err, modules) => {
});

```
## Specific Getters
* getModuleItems
* getQuizQuestions

### canvas.getModuleItems(courseId: String, moduleId: String, callback: Function)
``` js
canvas.getModuleItems(courseId, moduleId (err, moduleItems) => {
});
```
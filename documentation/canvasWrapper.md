# Canvas Wrapper #
The Canvas Wrapper simplifies calls to the Canvas API by providing shorthands for the basic CRUD operations (POST, GET, PUT, DELETE). 

The Canvas Wrapper handles pagination and throttling. It uses async.queue to limit the amount of calls it handles at one time and avoid overwhelming the Canvas servers.

The wrapper looks for an API token in an auth.json file 2 directories up from the canvas wrapper. This makes the wrapper easier to use in the D2L to Canvas conversion tool. However, The wrapper can change API tokens on the fly using the `changeUser` method.


Parameters for GET and DELETE requests must be appended to the URL/ URI before being sent to the wrapper.
The wrapper allows the user to input the full URL or just the path. When the domain is excluded `byui` is used by default, however this default can be changed with the `changeDomain` method.



In addition to the basic CRUD operations, the wrapper contains methods for GETting the following items:
* Pages
* Assignments
* Quizzes
* Modules
* Files

# How To Use #
Require the wrapper:
``` js
const canvas = require('../canvas.js')
```


## GET ##
Get is used to retrieve information from a server. Parameters are sent as part of the URL.
Handles pagination for you! :D Takes a url and a callback. 
### canvas.get(url: String, callback: Function)
``` js
canvas.get(url, (err, data) => {
});
```
### Parameters:
| Name          | Type      | Description  |
| ------------- |-----------|--------------|
| url           | String    | URL or URI to send the request to |
| callback      | function  | Function to execute for each element, taking two arguments |
| err           | Error     | An Error object |
| data          | Array     | Array of Objects returned by Canvas |


## POST ##
Post is used to __create new__ objects on a server. Parameters are wrapped in an object sent as the second parameter.
Sends parameters at type ```form/multipart```.
### canvas.post(url: String, requestParameters: Object, callback: Function)
``` js
var postObj = {"course[name]": "CSs 124" };
canvas.post(url, postObj, (err, body) => {
});
```
### Parameters:
| Name          | Type      | Description  |
| ------------- |-----------|--------------|
| url           | String    | URL or URI to send the request to |
| postObj       | Object    | The request parameters as specified in the Canvas API docs |
| callback      | function  | Function to execute for each element, taking two arguments |
| err           | Error     | An Error object |
| body          | Object    | look to the Canvas API docs to know what your specific request returns |


## POST JSON ##
The exact same as POST, but parameters are sent as type ```application/json```. This is useful depending on the call being made. Often calls that accept an array as a parameter work better when sent as JSON. Parameters DO NOT need to be stringified before sending to this method.
```js
var postObj = {
  course: {
    name: "CSs 124"
  }
};
canvas.postJSON(url, putObj, (err, body) => {
});
```


## PUT ##
Put is used to __update existing__ objects on a server. Parameters are wrapped in an object sent as the second parameter.
Sends parameters at type ```form/multipart```.
### canvas.put(url: String, requestParameters: Object, callback: Function)
``` js
var putObj = {"course[name]": "CS 124" };
canvas.put(url, putObj, (err, body) => {
});
```
### Parameters:
| Name          | Type      | Description  |
| ------------- |-----------|--------------|
| url           | String    | URL or URI to send the request to |
| putObj        | Object    | The request parameters as specified in the Canvas API docs |
| callback      | function  | Function to execute for each element, taking two arguments |
| err           | Error     | An Error object |
| body          | Object    | look to the Canvas API docs to know what your specific request returns |



## PUT JSON ##
The exact same as PUT, but parameters are sent as type ```application/json```. This is useful depending on the call being made. Often time calls that accept an array as a parameter work better when sent as JSON. Parameters DO NOT need to be stringified before sending to this method.
```js
var putObj = {
  course: {
    name: "CS 124"
  }
};
canvas.putJSON(url, putObj, (err, body) => {
});
```

## DELETE ##
Delete is used to __remove__ objects from a server. Parameters are sent as part of the URL.
### canvas.delete(url: String, callback: Function)
``` js
canvas.delete(url, (err, body) => {
});
```
### Parameters:
| Name          | Type      | Description  |
| ------------- |-----------|--------------|
| url           | String    | URL or URI to send the request to |
| callback      | function  | Function to execute for each element, taking two arguments |
| err           | Error     | An Error object |
| body          | Object    | look to the Canvas API docs to know what your specific request returns |


# Additional GET methods #
We include helper functions to 'GET' items that are frequently used by the conversion tool. General Getters retrieve items that live at the course level and only require a course id. Specific getters retrieve items that live below another item type, and therefore require the id of their parent in addition to the course id

## General Getters
* getModules
* getModuleItems
* getPages (page HTML not included)
* getFullPages (page HTML included. Only use if HTML is needed)
* getAssignments
* getDiscussions
* getFiles
* getQuizzes
* getQuizQuestions

### Example
``` js
canvas.getModules(courseID, (err, modules) => {
});
```
### Parameters:
| Name          | Type             | Description  |
| ------------- |------------------|--------------|
| courseID      | number \| string | The unique ID of the course you would like to get items from |
| callback      | function         | Function to execute for each element, taking two arguments |
| err           | Error            | An Error object |
| items         | Array            | An Array of items returned from Canvas. An array is returned even if there is only 1 item |




## Specific Getters
* getModuleItems
* getQuizQuestions

### canvas.getModuleItems(courseId: String, moduleId: String, callback: Function)
``` js
canvas.getModuleItems(courseId, moduleId (err, moduleItems) => {
});
```

# Additional Methods #
### Change User ###
Allows the user to change API tokens on the fly, allowing one progam to act as multiple different users.
```js
canvas.changeUser(authToken<string>);
```

### Change Domain ###
Changes the default domain used by the Wrapper when only a URI is given. Domain must be either `byui` (current default) or `pathway`.
```js
canvas.changeDomain(domain<string>);
```

### ChangeConcurrency ###
Alters the number of concurrent API calls allowed by the Canvas Wrapper. Default value is 20. Change takes place immediately.
```js
canvas.changeConcurrency(concurrency<number>);
```

### apiCount ###
Returns the number of api calls made with the wrapper.
```js
var apiCount = canvas.apiCount();
```

# Course Object Functions

## Overview
The course object will have these functions available for error handling and documentation. Authors of child modules are expected to use these to throw errors and document successful procedures.

### Syntax
All functions will follow the declaration: `course.functionName(parameters)`


### fatalError(err: Error)

Used to throw and record a fatal error. Fatal errors kill the program.

```js
course.fatalError(fatalError);
/* Sends the error happening in the grade-point-change
module up to main.js, where it is handled. */
```

### error(err: Error)

**Only used in Step Modules. This is not meant to be used in child modules.**

Used to throw and report a non-fatal error. Non-fatal errors do not stop the program from running, but are necessary to record.

```js
course.error(error);
/* Saves the error that just happened in grade-point-change
to our report for this module, but does not kill the process */
```


### warning(warning: String)

Used as a flag to alert the user to review a decision that could not be made programmatically OR to alert the user that an error may have occurred (i.e. if a module tries to delete a specific item but it couldn't be found, a warning will tell us to manually verify that the item doesn't exist).

```js
course.warning('A syllabus could not be found');
/* Saves the reported warning to the warning list to be
included in our final report at the end of the program */
```


### log(Header: string, Change: Object)

Used to document specific successful changes. This should be used whenever any small change to the course is made (i.e. an item's name has been altered, Quiz 2.1 has been altered, etc.). It is not used for generic success messages. The Header specifies what change has occurred, and the object gives specific details as to which items were changed.

```js
course.log(
  'Changed Grade Point',
  {'Assignment Name': assignment.name,
  'Assignment Type': assignment.type}
 );
/* Saves the reported log to the log list to be
included in our final report at the end of the program */
```

### message(message: String)

Anywhere you would normally use a console.log, use this instead. It should be used for overarching success messages.
```js
course.message('All quiz questions were retrieved from canvas');
/* Outputs the message to the console and saves the message
to the list of messages. Is not included in the final report. */
```


### newInfo(propertyName: string, value)

Creates a new property within `course.info` for the module to use, or for other modules to reference. Should be used sparingly.

```js
course.newInfo('gradesFixed', true);
/* Creates a new property in 'course.info' called 'gradesFixed'
with a truthy value. */
```

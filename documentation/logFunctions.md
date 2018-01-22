# Logging Functions

In order to track all of the actions the tool takes to complete its job, logs should be made of all items affected, as well as anything else important.

All logging functions are available from the course object.

## course.log(category: string, item: object)

This should be used whenever you have more than one item that is having the same action performed on it, or meets a certain criteria (i.e. changing all pages in a course, or recording all instances of "Brightspace" in the course). 

This is used to log an item. The `category` parameter should be a string with the title of the category the item fits into. For example, if I was altering a "Page" in Canvas, my category title would be "Pages Changed" or something similar. 

The `item` parameter is an object with any related data attached to it. For my "Page" example, I would put an object like this:

```js
course.log('Pages Changed', {
    title: page.title,
    id: page.id,
    parentFolderId: page.parent_folder_id
});
```

Each of the following functions is a simple wrapper for the `course.log` function, but it defines the category title for you on the back end.

## course.error(err: Error)

An example of how you might use it in a callback with an error parameter:
```js
canvas.get(url, (err, result) => {
    if (err) {
        course.error(err);
        return;
    }
    // rest of your code...
})
```

## course.warning(message: string)

Used when an error or problem occurs that might not be a bad thing. For example, when setting the syllabus in a canvas course, if the module didn't find a syllabus in the D2L course, it might be because there isn't one.

Example:
```js
// we didn't find a syllabus...
course.warning('Unable to locate syllabus. Is there one in the course?');
```

## course.fatalError(err: Error)

Used by the Shell. You should not use this in a child module unless directed to. Throws a fatal error that stops the entire tool.

```js
course.fatalError(err);
```

## course.message(message: string)

Used to record one-time actions that aren't attached to a specific item. For example, if we were altering all of the "Pages" in a Canvas course, and we would like to know when we've finished, we would use it like this:

```js
// Finished altering all of the pages
course.message('Completed processing all of the pages in the course');
```

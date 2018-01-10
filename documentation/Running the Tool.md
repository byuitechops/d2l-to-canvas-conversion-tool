# CLI


The program can be started with:

 `node cli`

Various flags can be used when running the program to changes it's behavior and output.  All settings are off by default.

 Available flags:

 Flag | Description |
 ---- | ----------- |
 -d   | Debug mode. Creates additional console logs.                                         |
 -k   | Keeps all files. Skips the part of the cleanup process that deletes temporary files. |
 -x   | Deletes the Canvas Course as part of the cleanup process. |
 -e   | Uses existing zip files in the D2LOriginal folder instead of downloading a course. |


 ### Example

 `$ d2c -d -k`

 This will run the program in debug mode *and* keep all of the files afterwards, so you can dig through them. Like your couch for extra change.

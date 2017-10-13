# CLI

In cases where the tool is installed as a global package, various flags can be used when running the program to changes it's behavior and output.

The program can be started with:

 `$ d2c`    

 (The '$' represents the prompt)

 Available flags:

 Flag | Description |
 ---- | ----------- |
 -A   | Reads in all course zip files in the present working directory.                      |
 -D   | Debug mode. Creates additional console logs.                                         |
 -O   | Currently not useable. Optimizes binary files before uploading.                      |
 -K   | Keeps all files. Skips the part of the cleanup process that deletes temporary files. |
 -C   | Should be used when running on a campus course. Alters behavior of the process.      |

 All of these settings are off by default.

 ### Examples

 `$ d2c -D -K`
 This will run the program in debug mode and keep all of the files afterwars, so you can dig through them. Like your couch for extra change.

 `$ d2c -A -C`
 Runs the program on all available zipped courses in the present working directory, and treats ALL of them as campus courses.

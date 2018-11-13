# D2L to Canvas Conversion Tool
### Created by the Online Learning Tech-Ops Development team
**Authors:**

*Zachary Williams*

*Daniel Green*

With a measure of help so large from Josh McKinney that we've come to trust our own ideas shouldn't be trusted.

## Purpose

This tool takes a given D2L course and converts it into a Canvas course, making what possible adjustments there are to help the course meet BYUI standards and policies.


## Overview
Definitions are located below.
A general overview of the tool's process follows:

1. Preparation is made for making changes to the course. This includes downloading the course programmatically from Brightspace, unzipping the course, and indexing it so our tool can understand and make changes to it.

2. "Pre-Import" child modules are ran. These changes are made before the course is imported into Canvas.

3. The Canvas course is created, the downloaded D2L course is uploaded into it.

4. "Post-Import" child modules are ran. These are made after the course has been imported and are made through Canvas API.

5. Cleanup occurs - extra files are removed from the hard drive (not the course), and reports/data are generated and saved.


## How to Install

To install, use this command:

```
npm install byuitechops/d2l-to-canvas-conversion-tool
```


## How to Run | CLI

To start the tool, navigate to the tool's location in your console and use this command:

```npm start```

OR 

```node cli```


| Flag | Description |
|------|---------|-------------|
| -e | Looks in the tool's `factory/originalZip` folder and uses the first zip it finds, instead of downloading a course |

## Prompt

The first step of the process asks you a variety of questions to determine what and how the tool needs to run. If you save your username (USR) and or password (PASS) as environment variables you will not be prompted for them. The questions asked in the prompt vary on the chosen platform so you may or may not be asked all of the following:

1. (Required) What platform is the course on? (Online, Pathway, Campus)
2. (Required) What is the Brightspace OU?
3. (Optional) What is the Canvas Shell ID? (Enter 0 if you're creating a new shell)
4. Which Import modules would you like to run? (choose from a list)
5. Which Pre-Import Child modules would you like to run? (choose from a list)
6. Which Post-Import Child modules would you like to run? (choose from a list)
7. Which Clean-up modules would you like to run? (choose from a list)
8. (Optional) What is the enrollment term? (leave blank for none. Ex: Winter 19)
9. What is the instructor's full name?
10. What is the instructor's email?
11. What is your username? (CCT username. Must have admin rights in D2L)
12. What is your password? (CCT password. Must have admin rights in D2L)


The typical answers for **Campus** courses are as follows. Please talk to a Lead before doing this for the first time:
1. Platform: campus
2. DBrightspace OU: check spreadsheet
3. Campus Course Shell ID: check spreadsheet. 0 if none exists
4. Import Shell Modules: enable create-course if no Canvas shell exists
5. Post-Import Child Modules: check spreadsheet (only "build-file-structure" would ever be used)
6. Campus Template: check spreadsheet
7. Enrollment Term: check spreadsheet
8. Instructor Name: First Last from spreadsheet
9. Instructor Email: spreadsheet (exclude "@byui.edu")
10. Your username and password (if needed)


After the conversion has completed for the Campus course, do the following:
1. Move HTML report into Google Drive
2. Remove yourself from the Trello Card
3. Use card menu to move it to FTC Post Analysis


### Outputs

The tool provides two reports after it is finished.

In the console: A report indicating the number of errors, fatal errors, and warnings generates. It also gives the modules that caused those errors, fatal errors, and warnings.

As a JSON file: A report is generated in the tools `reports` folder as a JSON file. It contains every log generated during the process.


## Development

### Execution Process

1. #### Prompt user for settings
Determine how to run the tool.

2. #### Download the course
Using the [d2l-course-downloader](https://github.com/byuitechops/d2l-course-downloader).

3. #### Preparation modules
This include generating the course object, creating necessary folders, unzipping the course, etc.

4. #### Pre-import child modules
Pre-import children are determined by `agenda.js` and by the prompt at runtime.

5. #### Import modules
This includes zipping the edited course files, creating a new course in canvas if needed, and uploading the course to Canvas.

6. #### Post-Import child modules
Post-import children are determined by `agenda.js` and by the prompt at runtime.

7. #### Clean-up modules
This includes generating reports, removing old files, and deleting the course if needed.


### Setup
#### Authentication
The following environment variables are used by the conversion tool. They are set using the `auth.bat` file.

| Variable | required | Description |
|----------|----------|-------------|
| CANVAS_API_TOKEN | true | Your canvas API token |
| USR | false | Your cct username |
| PASS | false | Your cct password |


### Unit Tests
I'm sorry. Good luck.


## Terms

**Conversion Tool**: The tool as a whole, and the process of getting the course from Brightspace into Canvas programmatically.

**Shell Module**: A modular piece of the entire tool that is critical in completing the entire process. (i.e. indexing the course)

**Child Module**: A modular piece of the tool that completes one action on a course. These are optional in completing the entire process. (i.e. fixing quiz questions after the course is imported)

**Canvas API**: Instructure's way of allowing external programs, like ours, to interface with the courses.

## Child modules

View child module development progress and descriptions here:

https://docs.google.com/spreadsheets/d/1k9AP3mxcDj_DOkcy7BUTOp_5FKZ0qJ4GX7YZx_rXZAo/edit#gid=47594566


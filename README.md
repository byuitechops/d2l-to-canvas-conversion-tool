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
git clone https://github.com/byuitechops/d2l-to-canvas-conversion-tool
```

## How to Run | CLI

To start the tool, navigate to the tool's location in your console and use this command:

```npm start```

OR 

```node cli```


| Flag | Description |
|------|-------------|
| -e | Looks in the tool's `factory/originalZip` folder and uses the first zip it finds, instead of downloading a course |

## Trello
We use Trello to organize conversion efforts with Campus & Online. 

Before running a course do the following the trello card:
1. Add your name to the trello card (so no one else tries to run the course at the same time)
2. (campus only) Verify the link to Brightspace

After the conversion has completed for a course, do the following:
1. Move HTML report into Google Drive
2. Remove yourself from the Trello Card
3. Move the Trello card to the next column in line


## Prompt

The first step of the process asks you a variety of questions to determine what and how the tool needs to run. If you save your username (USR) and or password (PASS) as environment variables you will not be prompted for them (more details in the setup section). The questions asked in the prompt vary on the chosen platform so you may or may not be asked all of the following:

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


 #### Online
 
To run an **online** course simply select the online platform, enter the Brightspace OU, and then use the default settings (spam enter). Because each online course is run using the same standards we use the same settings each time, and have set these values to the default for the online platform.

#### Campus

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


### Outputs

The tool provides Three reports after it is finished.

1. In the console: A report indicating the number of errors, fatal errors, and warnings generates. It also gives the modules that caused those errors, fatal errors, and warnings.

2. As a JSON file: A report is generated in the tools `reports` folder as a JSON file. It contains every log generated during the process.

3. An HTML file. This is essentially an HTML version of the JSON report. It needs to be uploaded to the google drive so that we have a permanent record of the transition. [Google Drive for Campus](https://drive.google.com/drive/u/1/folders/1L01Pt3KJB2LVr5yGPNU-qc4Qq6O0-B1c) | [Google Drive for Online](https://drive.google.com/drive/u/1/folders/1tH19uZyzasjRnxNeButi5hXdE9WR4AXL)


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


### Testing
Four Brightspace courses were created to test on. They are referred to as the gauntlet courses. Ideally they contain one of everything that breaks. We use these courses to test both the tool and individual child modules.  While we anticipated a need for 4 courses, for the most part we only need to use the first one. A copy of this course is kept up to date in Canvas. It is named Pristine Gauntlet 1 in the development sub-account. Any changes made to the gauntlet need to be made in Brightspace and then moved manually to Canvas by resetting the course content on the Canvas course and re-importing the D2L gauntlet course download. These gauntlets play a vital role in the [child development kit](https://github.com/byuitechops/child-development-kit) (CDK), a tool created to allow us to run/test child modules individually.


## Terms

**Conversion Tool**: The tool as a whole, and the process of getting the course from Brightspace into Canvas programmatically.

**Shell Module**: A modular piece of the entire tool that is critical in completing the entire process. (i.e. indexing the course)

**Child Module**: A modular piece of the tool that completes one action on a course. These are optional in completing the entire process. (i.e. fixing quiz questions after the course is imported)

**Canvas API**: Instructure's way of allowing external programs, like ours, to interface with the courses.

## Child modules

Download [this repository](https://github.com/byuitechops/child-template) to use as a template to create your own child module.

The [Child Development Kit](https://github.com/byuitechops/child-development-kit) was built to allow us to easily test child modules individually.

View child module development progress and descriptions here:
https://docs.google.com/spreadsheets/d/1k9AP3mxcDj_DOkcy7BUTOp_5FKZ0qJ4GX7YZx_rXZAo/edit#gid=47594566


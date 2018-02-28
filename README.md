# D2L to Canvas Conversion Tool

## Purpose

This tool takes a given D2L course and converts it into a Canvas course, making what possible adjustments there are to help the course meet BYUI standards and policies.


## How to Install

To install, use this command:

```
npm install --save byuitechops/d2l-to-canvas-conversion-tool
```


## How to Run

**Provide any commands used to run the tool. If it is meant to be used as a dependency, include how to call it in their code. See the following examples:**

To start the tool, navigate to the tool's location in your console and use this command:

```npm start```

OR 

```node cli```

## Prompt

The first step of the process asks you a variety of questions to determine what and how the tool needs to run:

1. (Required) What platform is the course on? (Online, Pathway, Campus)
2. (Optional) What is the existing Canvas OU? (If you are replacing an existing course instead of creating a new one)
3. (Required) What is the D2L OU?
4. (Required without the "-e" tag) What is your username? (Must have admin rights in D2L)
5. (Required without the "-e" tag) What is your password? (Must have admin rights in D2L)
6. (Required) What pre-import child modules do you want to run?
7. (Required) What post-import child modules do you want to run?
8. (Required) Do you want to create lesson folders in media/documents? (Y/N answer - Check the documentation for reorganize-file-structure)

**If the tool uses a Command Line Interface, provide a table with the flag, aliases, and description of each commandline parameter.**

| Flag | Aliases | Description |
|------|---------|-------------|
| -exists | -e | Looks in the tool's `factory/originalZip` folder and uses the first zip it finds, instead of downloading a course |

### Outputs

**Describe the outputs the tool returns.**

The tool provides two reports after it is finished.

In the console: A report indicating the number of errors, fatal errors, and warnings generates. It also gives the modules that caused those errors, fatal errors, and warnings.

As a JSON file: A report is generated in the tools `reports` folder as a JSON file. It contains every log generated during the process.

## Requirements

**List all of the business requirements for the project. What are the expectations for the project? What does it need to be able to do? Example:**

- Must be able to convert all provided strings into awesome quotes from Star Wars
- Must account for students with disabilities
- Must be written in promises, without callbacks
- etc.

## Development

### Execution Process
- Include the main steps that your code goes through to accomplish its goal
- These do not need to be overly technical, but enough for a developer to read and follow along in the code (i.e. "Use a ForEach to loop through each file" is too technical)
- Use a heading for each step

Example:

#### Read in file
Read in the CSV and parse it.

#### Manipulate the data
Filter data down to what's needed and format it.

#### Provide report
Generate CSV with formatted data and write it to the hard drive.


### Setup
- Include anything important for a developer to know if they are setting up the tool to develop it more.
- This could include instructions to install certain developer dependencies.

Example:

Make sure to include `canvas-wrapper` as a developer dependency when you need it:

```
npm i --save-dev byuitechops/canvas-wrapper
```

Here are instructions on how to set up the development server:

.....

### Unit Tests
- Explain each of your unit tests and their inputs.
- Provide all inputs used in testing so developers can use the same tests (or add on to them). For example, attach a CSV for each test case.











# d2l-to-canvas-conversion-tool

### Created by the Online Learning Tech-Ops Development team


**Authors:**

*Zachary Williams*

*Daniel Green*

With a measure of help so large from Josh McKinney that we've come to trust our own ideas shouldn't be trusted.

## Purpose

This tool's purpose is to convert courses from our current D2L setup into Canvas. Documentation on the process can be found in the Documentation folder, and in the spreadsheet linked below.

## Terms

**Conversion Tool**: The tool as a whole, and the process of getting the course from Brightspace into Canvas programmatically.

**Shell Module**: A modular piece of the entire tool that is critical in completing the entire process. (i.e. indexing the course)

**Child Module**: A modular piece of the tool that completes one action on a course. These are optional in completing the entire process. (i.e. fixing quiz questions after the course is imported)

**Canvas API**: Instructure's way of allowing external programs, like ours, to interface with the courses.

## Overview

A general overview of the tool's process follows:

1. Preparation is made for making changes to the course. This includes downloading the course programmatically from Brightspace, unzipping the course, and indexing it so our tool can understand and make changes to it.

2. "Pre-Import" child modules are ran. These changes are made before the course is imported into Canvas.

3. The Canvas course is created, the downloaded D2L course is uploaded into it.

4. "Post-Import" child modules are ran. These are made after the course has been imported and are made through Canvas API.

5. Cleanup occurs - extra files are removed from the hard drive (not the course), and reports/data are generated and saved.

## Child modules

View child module development progress and descriptions here:

https://docs.google.com/spreadsheets/d/1k9AP3mxcDj_DOkcy7BUTOp_5FKZ0qJ4GX7YZx_rXZAo/edit#gid=47594566


# CLI

Navigate to the saved tool, and use the following commands to run the tool.

The program can be started with:

 `node cli`

 OR

 `npm start`

Various flags can be used when running the program to changes it's behavior and output.  All settings are off by default.

 Available flags:

 Flag | Description |
 ---- | ----------- |
 -e   | Uses the first existing zip file in the D2LOriginal folder instead of downloading a course. |


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

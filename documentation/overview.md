# D2L-Canvas Conversion Tool

### Overview
The main objective of this tool is to build on top of the native conversion process provided by Canvas when converting a course from D2L (Brightspace) to Canvas. Canvas provides a conversion tool when importing a course from D2L, but it only successfully converts about 40% of the course. The process will follow five steps:

0. Download the course from D2L. (Handled separately from this program)
1. The course is indexed and a JSON copy fo the course is created
2. Alterations are made on the course JSON to help them successfully convert with the native Canvas conversion tool.
3. The course is uploaded to the canvas conversion tool.
4. Alterations are made on the converted version of the course to enable any non-working features that can't be fixed before converting.
5. Clean up unused files and the course as needed. Generate a report of the conversion.

## Dates & Goals
- *SEPT 21*: First working iteration completed, pages successfully converting over cleanly
- *SEPT 31*: Manual Transition observed by McKinney's team
- *OCT 15*: 80% of course successfully converted by the tool
- *OCT 30*: Official Decision made on this project
- *JAN 1*: Piloting of the completed tool begins (95% conversion success, course usable by students)
- *JAN 15*: Begin conversions with production build of tool
- *APRIL 15*: Complete block course conversions
- *JULY 1*: Complete all course conversions
- *JULY 21*: Summer Session runs with converted courses
- *AUG 15*: Project completed for Fall to be able to use converted courses

*Other Goals:*
- Build a report when a course is converted of things that must be fixed by hand, errors flagged as the program ran, verbose, overall success, etc.
- Thoroughly test each and every function, module, and bit of code used by this tool.
- Don't mess up.

## Development Process
After observing a course's lost content after converting with the tool as is, this process will be followed to help move this project along as quickly and efficiently as possible:

1. A meeting with Zach, Daniel, and Josh to determine the next function/module to be written to remedy a single type of content lost or broken in conversion.
3. Documentation is updated.
4. A few days are spent focused on creating that function/module.
5. When a working version is completed, another meeting happens to determine its success and viability.
6. Documentation is updated.
7. We test the life out of that function until it gives up on its dreams and submits its will to the system (or until it works as perfectly as it possibly can).
8. Documentation is updated.
9. Repeat

Note: Documentation should be updated as needed, not just on the prescribed steps above.

## Tool Architecture

There are 3 layers to the project:
1. **Main** - Begins the process, sees it all the way through
2. **Step Modules** - A module for each main step, as described above
3. **Child Modules** - Modules used within each Step module to complete specific tasks (i.e. fixing quizzes). In cases where it is appropriate, there may be child modules for child modules.

**File Tree**

A folder for each Step module will be present. Each folder will contain the children modules for their respective step module. The step modules *.js* files will be located in their respective folders.

### Async Operations

In order to run each step one-by-one without stepping on our own toes, the **async library** will be used, specifically the async.waterfall method.

### Compression Operations (Zip/Unzip)

The process requires decompressing each course before alterations are made to them. Following those changes, they are compressed again to be imported into Canvas. The **adm-zip** library will be used to perform those functions.

# Tool Conversion Process In Depth


## Step 0: Download Course from D2L

The Nightmare before Christmas tool will be used to download the courses. It may be integrated into the conversion tool using a CLI if time allows.

The Nightmare Before Christmas can be found here: https://canvas.instructure.com/doc/api/courses.html

## Step 1: Indexing the Course

Save the course files as a massive JSON object. Changes made by the submodules will occur to this object, which will be written the hard drive once all pre-conversion changes are made.
This reduces stress on the hard drive by only reading and writing the course only once.

## Step 2: Pre-Conversion Alterations

Specific hanges to the course are to be determined. It is expected that most fo the course fixes will occur here.
The course object will be written to the hard drive once all the changes to the course have been made.

## Step 3: Import Course into Canvas

It is probable that the changes to the course will be written to the hard drive here. The course will be rezipped in preparation for the upload to Canvas. 
Create an empty (blueprint?) course in canvas.
Upload the course to the Canvas conversion tool.
Get migration issues from Canvas for reporting purposes.

## Step 4: Post-Conversion Alterations

Use the Canvas API to make additional fixes to the course. Fixes made here are to be determined. A canvas module will be created that abstracts the CRUD operations and any additional API calls that are frequently made.

## Step 5: Clean Up

Leftover course files are removed (Unzipped course files for sure. Should we delete the completed zip as well?).
The Canvas course is deleted if there were too many errors in the conversion.
Both these options will be turned off if the debugging flag is included at runtime.
The final report object will be passed to the CLI/ GUI and the report will be generated there.

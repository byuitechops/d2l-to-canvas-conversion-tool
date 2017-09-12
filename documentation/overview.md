# D2L-Canvas Conversion Tool

### Overview
The main objective of this tool is to build on top of the native conversion process provided by Canvas when converting a course from D2L (Brightspace) to Canvas. Canvas provides a conversion tool when importing a course from D2L, but it only successfully converts about 40% of the course. The process will follow five steps:
1. The course is downloaded from Brightspace.
2. Alterations are made on the course files to help them successfully convert with the native Canvas conversion tool.
3. The course is converted.
4. Alterations are made on the converted version of the course to enable any non-working features that can't be fixed before converting.
5. The course is added to Canvas.

## Dates & Goals
- *OCT 30*: Official Decision made on this project
- *SEPT 21*: First working iteration completed, pages successfully converting over cleanly
- *SEPT 31*: Manual Transition observed by McKinney's team
- *OCT 15*: 80% of course successfully converted by the tool
- *JAN 1*: Piloting of the completed tool begins (95% conversion success, course usable by students)
- *JAN 15*: Begin conversions with production build of tool
- *APRIL 15*: Complete block course conversions
- *JULY 1*: Complete all course conversions
- *JULY 21*: Summer Session runs with converted courses
- *AUG 15*: Project completed for Fall to be able to use converted courses

*Other Goals:*
- Build a report when a course is converted of things that must be fixed by hand, errors flagged as the program ran, verbose, overall success, etc.
- Thoroughly test each and every function, module, and bit of code used by this tool
- Don't mess up

## Development Process
After observing a course's lost content after converting with the tool as is, this process will be followed to help move this project along as quickly and efficiently as possible:

1. A meeting with Zach, Daniel, and Josh to determine the next function/module to be written to remedy a single type of content lost or broken in conversion. 
3. Documentation is updated.
4. A few days are spent focused on that function/module.
5. When a working version is presented, another meeting happens to determine its success and viability. 
6. Documentation is updated.
7. We test the life out of that function until it gives up on its dreams and submits its will to the system (or until it works as perfectly as it possibly can). 
8. Documentation is updated.
9. Repeat

Note: Documentation should be updated as needed, not just on the prescribed steps above.

## Tool Architecture



## Tool Conversion Process In Depth

## Step 1: Download Course from D2L

*Who wrote the auto-downloader? Where do we get that from?*

Using the tool written by *NAME*, located at *LOCATION URL*, the course will first need to be programmatically downloaded.




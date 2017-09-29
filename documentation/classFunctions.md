# Course Object Functions

## Overview
The course object will have these functions available for error handling and documentation. Authors of child modules are expected to use these to throw errors and document successful procedures.

### Syntax
All functions will follow the declaration: `course.functionName(parameters)`

### verifyProperty(propertyName: string)

This verifies that the given property exists in either `course.info` or `course.settings`.

### throwErr(moduleName: string, err: Error)

Used to throw and record a fatal error. Fatal errors kill the program.

### throwFatalErr(moduleName: string, err: Error)

**Only used in Step Modules. This is not meant to be used in child modules.**

Used to throw and report a non-fatal error. Non-fatal errors do not stop the program from running, but are necessary to record.

### success(moduleName: string, message: String)

Used to document every successful change. This should be used whenever any change to the course is made (i.e. the course has been unzipped, Quiz 2.1 has been altered, etc.).

### addModuleReport(moduleName: string)

 Creates a new ReportModule class object within `course.report` to be used to report errors and changes for each module. Should be used at the start of each module.

### newInfo(propertyName: string, value)

Creates a new property within `course.info` for the module to use, or for other modules to reference. Should be used sparingly.

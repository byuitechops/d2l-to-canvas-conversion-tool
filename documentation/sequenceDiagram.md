# Sequence Diagram

The `preImport` and `postImport` modules are represented as a loop since we don't know how many child modules will be present.

The diagram is generated using [Mermaid](https://mermaidjs.github.io/mermaid-live-editor/#/edit/Z3JhcGggVEQKQVtDaHJpc3RtYXNdIC0tPnxHZXQgbW9uZXl8IEIoR28gc2hvcHBpbmcpCkIgLS0-IEN7TGV0IG1lIHRoaW5rfQpDIC0tPnxPbmV8IERbTGFwdG9wXQpDIC0tPnxUd298IEVbaVBob25lXQpDIC0tPnxUaHJlZXwgRltDYXJdCg). View it [here](https://mermaidjs.github.io/mermaid-live-editor/#/edit/Z3JhcGggVEQKQVtDaHJpc3RtYXNdIC0tPnxHZXQgbW9uZXl8IEIoR28gc2hvcHBpbmcpCkIgLS0-IEN7TGV0IG1lIHRoaW5rfQpDIC0tPnxPbmV8IERbTGFwdG9wXQpDIC0tPnxUd298IEVbaVBob25lXQpDIC0tPnxUaHJlZXwgRltDYXJdCg) by copying/pasting the code, or download a package for your editor that allows it to be previewed there. Additionally, *sequenceDiagram.pdf* has the same contents.

```mermaid
sequenceDiagram

activate CLI
CLI ->> +main.js: courseZipDir, Options

main.js -X +indexer.js: settings
indexer.js -X +createCourseObj.js: settings
createCourseObj.js ->> -indexer.js: course
indexer.js -X +nameTheCourse.js: course
nameTheCourse.js ->> -indexer.js: course
indexer.js -X +unzip.js: course
unzip.js ->> -indexer.js: course + unzipped dir
indexer.js -X +indexCourse.js: course
indexCourse.js ->> -indexer.js: course + course info
indexer.js ->> -main.js: course

main.js -X +preImport.js: course
Loop Each Fix Module
preImport.js -X +Fix Modules: course
Note right of Fix Modules: As many changes to the files before zipping and uploading to the new course need to be made, are made here
Fix Modules ->> -preImport.js: course + change
end
preImport.js ->> -main.js: course + changes

main.js -X +importCourse.js: course
importCourse.js -X +zipCourse.js: course
zipCourse.js ->> -importCourse.js: course + zipped dir
importCourse.js -X +createCourse.js: course
createCourse.js ->> -importCourse.js: course
importCourse.js -X +uploadCourse.js: course
uploadCourse.js ->> -importCourse.js: course
importCourse.js -X +getMigrationIssues.js: course
getMigrationIssues.js ->> -importCourse.js: course + migration issues
importCourse.js ->> -main.js: course + migration data

main.js -X +postImport.js: course
Loop Every API Fix Module
postImport.js -X +API Fixes: course
Note right of API Fixes: Each of the post-import fixes are made here, as many as needed
API Fixes ->> -postImport.js: course + changes
end
postImport.js ->> -main.js: course + changes

main.js -X +cleanUp.js: course
cleanUp.js ->> deleteCourse.js: course
cleanUp.js ->> removeFiles.js: course
cleanUp.js ->> -main.js: course
main.js ->> -CLI: course + generated report
deactivate CLI
```

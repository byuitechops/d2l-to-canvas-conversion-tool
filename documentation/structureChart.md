# Structure Chart

These diagrams are generated using [Mermaid](https://mermaidjs.github.io/mermaid-live-editor/#/edit/Z3JhcGggVEQKQVtDaHJpc3RtYXNdIC0tPnxHZXQgbW9uZXl8IEIoR28gc2hvcHBpbmcpCkIgLS0-IEN7TGV0IG1lIHRoaW5rfQpDIC0tPnxPbmV8IERbTGFwdG9wXQpDIC0tPnxUd298IEVbaVBob25lXQpDIC0tPnxUaHJlZXwgRltDYXJdCg). View them [here](https://mermaidjs.github.io/mermaid-live-editor/#/edit/Z3JhcGggVEQKQVtDaHJpc3RtYXNdIC0tPnxHZXQgbW9uZXl8IEIoR28gc2hvcHBpbmcpCkIgLS0-IEN7TGV0IG1lIHRoaW5rfQpDIC0tPnxPbmV8IERbTGFwdG9wXQpDIC0tPnxUd298IEVbaVBob25lXQpDIC0tPnxUaHJlZXwgRltDYXJdCg) by copying/pasting the code, or download a package for your editor that allows it to be previewed there. Additionally, *structureChart.pdf* has the imaged code.

```mermaid
graph TD;
CLI-->|zipDir, Options/report|main.js;

id1[Text on lines indicates input/output for each function];

main.js -.-> |course/course += options| indexer.js;
indexer.js -.-> |course/course += unzipped dir| unzip.js;
indexer.js -.-> |course/course += course info| indexCourse.js;

main.js -.-> |course/course += all changes| preImport.js;
preImport.js -.-> |course/course += change|fix-1.js;
preImport.js -.-> |course/course += change| fix-2.js;
preImport.js -.-> |course/course += change| fix-3.js;
preImport.js -.-> |course/course += change| fix-n.js;
preImport.js -.-> |course/course + zip dir| zipCourse.js;

main.js -.-> |course/course| importCourse.js;
importCourse.js -.-> |course/course += migration data| createCourse.js;
importCourse.js -.-> |course/course| uploadCourse.js;
importCourse.js -.-> |course/course + migration issues| migrationIssues.js;

main.js -.-> |course/course += changes| postImport.js;
postImport.js -.-> |course/course += change| apiFix-1.js;
postImport.js -.-> |course/course += change| apiFix-2.js;
postImport.js -.-> |course/course += change| apiFix-3.js;
postImport.js -.-> |course/course += change| apiFix-n.js;

main.js -.-> |course/report| cleanUp.js
cleanUp.js -.-> |course| deleteCourse.js
cleanUp.js -.-> |course| removeFiles.js
cleanUp.js -.-> |course/report| generateReports.js
```

Because the above image is obviously way too small to read, we've broken it up into smaller structure charts. We hope your eyes revel in the simplicity.

**On each arrow-line to each function, there is some text. These indicate input/output. The left (input) is the parameter(s) we are passing in. The right is the output. "+=" indicates that the output is the same as the input, but with the described changes.**

# main.js
```mermaid
graph TD;
main.js -.-> |settings/course| indexer.js;
main.js -.-> |course/course += changes| preImport.js;
main.js -.-> |course/course| importCourse.js;
main.js -.-> |course/course += changes| postImport.js;
main.js -.-> |course/course| cleanUp.js;
```

# indexer.js
```mermaid
graph TD;
main.js -.-> |course/course += options| indexer.js;
indexer.js -.-> |course/course += course object| createCourseObj.js;
indexer.js -.-> |course/course += course name| nameTheCourse.js;
indexer.js -.-> |course/course += unzipped dir| unzip.js;
indexer.js -.-> |course/course += course info| indexCourse.js;
```

# preImport.js
```mermaid
graph TD;
main.js -.-> |course/course += all changes| preImport.js;
preImport.js -.-> |course/course += change|fix-1.js;
preImport.js -.-> |course/course += change| fix-2.js;
preImport.js -.-> |course/course += change| fix-3.js;
preImport.js -.-> |course/course += change| fix-n.js;
```

# importCourse.js
```mermaid
graph TD;
main.js -.-> |course/course| importCourse.js;
importCourse.js -.-> |course/course += course zip| zip.js;
importCourse.js -.-> |course/course += migration data| createCourse.js;
importCourse.js -.-> |course/course| uploadCourse.js;
importCourse.js -.-> |course/course + migration issues| migrationIssues.js;
```

# postImport.js
```mermaid
graph TD;
main.js -.-> |course/course += changes| postImport.js;
postImport.js -.-> |course/course += change| apiFix-1.js;
postImport.js -.-> |course/course += change| apiFix-2.js;
postImport.js -.-> |course/course += change| apiFix-3.js;
postImport.js -.-> |course/course += change| apiFix-n.js;
```

# cleanUp.js
```mermaid
graph TD;
main.js -.-> |course/course| cleanUp.js
cleanUp.js -.-> |course| deleteCourse.js
cleanUp.js -.-> |course| removeFiles.js
```

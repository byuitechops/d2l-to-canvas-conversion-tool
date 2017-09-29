/*eslint-env node, es6*/
/*eslint no-console:0*/

class ReportModule {
   constructor(name) {
      this.name = name;
      this.fatalErrs = [];
      this.errors = [];
      this.changes = [];
   }
}

class File {
   constructor(name, guts, doc) {
      this.name = name;
      this.guts = guts;
      this.doc = doc;
   }
}

class Dir {
   constructor(files, dirs) {
      this.files = files;
      this.dirs = dirs;
   }
}

class Course {
   constructor(settings) {
      this.report = [];
      this.settings = {
         'debug': settings.debug,
         'readAll': settings.readAll,
         'platform': settings.platform
      };
      this.info = {
         'migrationID': '',
         'migrationIssues': [],
         'fileName': '',
         'originalFilepath': '',
         'unzippedFilepath': '',
         'preparedFilepath': '',
         'courseName': '',
         'canvasOU': 0,
         'D2LOU': 0
      };
      this.content = {
         // Do we want to create the File and Dir objects here or in indexer?
         // Probably indexer, since that's where the rest will be made recursively
         // 'files': [],
         // 'dirs': []
      };
   }

   findReportModule(reportModule) {
      return reportModule.name === this.toString();
   }

   /* Adds fatal errors to report for given module */
   throwFatalErr(moduleName, err) {
      var index = this.report.findIndex(findReportModule, moduleName);
      if (index < 0) {
         console.log(`Report Module was not found: ${moduleName}`);
      } else {
         this.report[index].fatalErrs.push(err);
      }
   }

   /* Adds non-fatal errors to report for given module */
   throwErr(moduleName, err) {
      var index = this.report.findIndex(findReportModule, moduleName);
      if (index < 0) {
         console.log(`Report Module was not found: ${moduleName}`);
      } else {
         this.report[index].errors.push(err);
      }
   }

   /* Adds successful changes to report for given module */
   success(moduleName, message) {
      var index = this.report.findIndex(findReportModule, moduleName);
      if (index < 0) {
         console.log(`Report Module was not found: ${moduleName}`);
      } else {
         this.report[index].changes.push(err);
      }
   }

   /* Adds new "junk drawer" item to info */
   newInfo(property, value) {
      course.info[property] = value;
   }

   /* Creates a new Report Module */
   addModuleReport(moduleName) {
      var index = this.report.findIndex(findReportModule, moduleName);
      if (index > 0) {
         console.log(`Report Module already created: ${moduleName}`);
      } else {
         this.report.push(new ReportModule(moduleName));
      }
   }
}

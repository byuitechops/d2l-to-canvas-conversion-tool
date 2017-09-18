// Course ID (Get and Set)
var courseId = '0';
exports.setCourseId = (id) => {
  courseId = id;
};
exports.getCourseId = () => {
  return courseId;
};

// filename (Course ZIP) Get & Set
var filename = 'default.zip';
exports.setFilename = (courseFilename) => {
  filename = courseFilename;
};
exports.getFilename = () => {
  return filename;
};

// courseName Get & Set
var courseName = 'FDHUM 110';
exports.setCourseName = (name) => {
  courseName = name;
};
exports.getCourseName = () => {
  return courseName;
};

// migrationId Get & Set
var migrationId = '0';
exports.setMigrationId = (id) => {
  migrationId = id;
};
exports.getMigrationId = () => {
  return migrationId;
};

// migrationIssues Get & Set
var migrationIssues = [];
exports.setMigrationIssues = (issues) => {
  migrationIssues = issues;
};
exports.getMigrationIssues = () => {
  return migrationIssues;
};
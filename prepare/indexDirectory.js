/*eslint-env node, es6*/
/*eslint no-unused-vars:0, no-console:0*/
var fs = require('fs'),
  path = require('path'),
  asyncLib = require('async'),
  File = require('../classes/File.js'),
  Dir = require('../classes/Dir.js');

/*********************************
 * Not sure what this is here for
 *********************************/
function parseTheDom(guts) {
  return guts;
}

/********************************
 * Filter Function used to keep files of certin types
 *******************************/
function checkcanEdit(filePath) {
  var ext = path.extname(filePath),
    keepers = ['.html', '.xml'];
  return keepers.includes(ext);
}

/***************************************
 * This function asynconusly gathers all the stuff that a file needs then calls the File Class
 ***************************************/
function makeFile(globalPath, makeFileCb) {

  //do we want to read the file?
  var canEdit = checkcanEdit(globalPath),
    file;

  //if not a text file don't read it in
  if (!canEdit) {
    file = new File(globalPath, '', canEdit);
    makeFileCb(null, file);
  } else {
    //read the file
    fs.readFile(globalPath, 'utf8', function (readFileErr, guts) {
      if (readFileErr) {
        makeFileCb(readFileErr);
        return;
      }
      file = new File(globalPath, guts, canEdit);
      makeFileCb(null, file);
    });
  }
}

/********************************
 * Sort out dirs and files based on a statobj
 *******************************/
function filterToFilePaths(items) {
  return items
    .filter(item => item.isFile)
    .map(item => item.path);
}

/********************************
 * This gathers all the stuff it needs to make a Dir and then calls the Dir class
 *******************************/
function makeDir(globalPath, fileList, makeDirCb) {

  /********************************
   * This makes the filenames global and gets info from stats obj
   *******************************/
  function aboutFile(name, aboutFileCb) {
    var fullPath = path.join(globalPath, name);
    //get the stat obj for the item
    fs.stat(fullPath, function (errStat, statObj) {
      if (errStat) {
        aboutFileCb(errStat, null);
        return;
      }

      //send back the info we need
      aboutFileCb(null, {
        path: fullPath,
        isFile: statObj.isFile()
      });
    });
  }

  fs.readdir(globalPath, function (readDirErr, dirList) {
    //check if err when reading the dir
    if (readDirErr) {
      return makeDirCb(readDirErr);
    }

    //figure out if the item is a file or folder
    asyncLib.map(dirList, aboutFile, function (aboutFileErr, items) {
      if (aboutFileErr) {
        makeDirCb(aboutFileErr);
        return;
      }

      // Give us only files, not directories, give filepaths
      var sortedItems = filterToFilePaths(items);
      // Make the file objects
      // Just to note if this dir doesn't have any files (sortedItems.files = []) then makeFile is not called and files = []
      asyncLib.map(sortedItems, makeFile, function (makeFileErr, files) {
        if (makeFileErr) {
          makeDirCb(makeFileErr);
          return;
        }

        /* Add our list of files to our current list */
        fileList = [...fileList, ...files];

        // Go through remaining directories for their files
        // Just to note if this dir doesn't have any dir (sortedItems.dir = []) then makeDir is not called and dirs = []
        asyncLib.map(sortedItems.dirs, makeDir, function (makeDirErr, dirs) {
          var dirOut;
          if (makeDirErr) {
            makeDirCb(makeDirErr);
            return;
          }
          /* Send our list of files on once we've gone through every directory */
          makeDirCb(null, fileList);
        });
      });
    });
  });
}

/********************************
 * Start Here
 *******************************/
function indexer(globalPath, cb) {
  var fileList = [];
  makeDir(globalPath, fileList, cb);
}

module.exports = indexer;

/*eslint-env node, es6*/
/*eslint no-unused-vars:0, no-console:0*/
var fs = require('fs'),
    path = require('path'),
    asyncLib = require('async'),
    File = require('./classes/File.js'),
    Dir = require('./classes/Dir.js');

/*********************************
 * Not sure what this is here for
 *********************************/
function parseTheDom(guts) {
    return guts;
}


/********************************
 * Filter Function used to keep files of certin types
 *******************************/
function checkIsTextFile(filePath) {
    var ext = path.extname(filePath),
        keepers = ['.html', '.xml'];
    return keepers.includes(ext);
}

/***************************************
 * This function asynconusly gathers all the stuff that a file needs then calls the File Class
 ***************************************/
function makeFile(globalPath, makeFileCb) {

    //do we want to read the file?
    var isTextFile = checkIsTextFile(globalPath),
        file;

    //if not a text file don't read it in
    if (!isTextFile) {
        file = new File(globalPath, '', isTextFile);
        makeFileCb(null, file);
    } else {
        //read the file
        fs.readFile(globalPath, 'utf8', function (readFileErr, guts) {
            if (readFileErr) {
                makeFileCb(readFileErr)
                return;
            }
            file = new File(globalPath, guts, isTextFile);
            makeFileCb(null, file);
        });
    }
}



/********************************
 * Sort out dirs and files based on a statobj
 *******************************/
function filterToFilesAndDirsPaths(items) {
    //these are the lists
    var sortedItems = {
        dirs: [],
        files: []
    };

    return items.reduce(function (acc, item) {
        if (item.isDir) {
            acc.dirs.push(item.path)
        } else if (item.isFile) {
            acc.files.push(item.path)
        }
        return acc;
    }, sortedItems);
}


/********************************
 * This gathers all the stuff it needs to make a Dir and then calls the Dir class 
 *******************************/
function makeDir(globalPath, makeDirCb) {

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
                isDir: statObj.isDirectory(),
                isFile: statObj.isFile()
            });
        })
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

            //Sort dirs and files into lists based on a statobj, it just keeps the paths in the two lists
            var sortedItems = filterToFilesAndDirsPaths(items);
            //make the files
            //just to note if this dir doesn't have any files (sortedItems.files = []) then makeFile is not called and files = []
            asyncLib.map(sortedItems.files, makeFile, function (makeFileErr, files) {
                if (makeFileErr) {
                    makeDirCb(makeFileErr);
                    return;
                }

                //make the dirs
                //just to note if this dir doesn't have any dir (sortedItems.dir = []) then makeDir is not called and dirs = []
                asyncLib.map(sortedItems.dirs, makeDir, function (makeDirErr, dirs) {
                    var dirOut;
                    if (makeDirErr) {
                        makeDirCb(makeDirErr);
                        return;
                    }
                    dirOut = new Dir(globalPath, files, dirs);
                    makeDirCb(null, dirOut);
                });
            });
        });
    });
}



/********************************
 * Start Here
 *******************************/
function indexer(globalPath, cb) {
    makeDir(globalPath, cb);
}

module.exports = indexer;


var globalPath = path.resolve('.');
indexer(globalPath, function (err, dir) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(dir, null, 2));
});

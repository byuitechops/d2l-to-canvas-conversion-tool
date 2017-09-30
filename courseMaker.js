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
var counter = 0;
/***************************************
 * This function asynconusly gathers all the stuff that a file needs then calls the File Class
 ***************************************/
function makeFile(globalPath, makeFileCb) {
    counter += 1;


    //read the file
    fs.readFile(globalPath, 'utf8', function (readFileErr, guts) {
        var file, dom;
        if (readFileErr) {
            makeFileCb(readFileErr)
            return;
        }

        //parse in to dom if we can
        //dom = parseTheDom(guts);
        file = new File(globalPath, guts, counter);

        makeFileCb(null, file);
    });
}


/********************************
 * Filter Function used to keep files of certin types
 *******************************/
function toFilesWeWant(filePath) {
    var ext = path.extname(filePath),
        keepers = ['.html', '.xml'];
    return keepers.includes(ext);
}

/********************************
 * Sort out dirs and files based on a statobj
 *******************************/
function keepFilesAndDirsGlobalPaths(items) {
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

            //Sort out dirs and files based on a statobj, it just keeps the paths in the two lists
            var sortedItems = keepFilesAndDirsGlobalPaths(items);

            //keep files we want
            //sortedItems.files = sortedItems.files.filter(toFilesWeWant)

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
    globalPath = path.resolve(globalPath);

    //the path passed in will be a folder path so just use makeDir
    makeDir(globalPath, function (err, dir) {
        if (err) return cb(err);
        cb(null, dir);
    });
}

module.exports = indexer;

indexer('.', function (err, dir) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(dir);
});

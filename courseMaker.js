/*eslint-env node, es6*/
/*eslint no-unused-vars:0, no-console:0*/

var fs = require('fs'),
    path = require('path'),
    asyncLib = require('async');

function parseTheDom(guts) {
    return guts;
}


function File(globalPath, guts, dom) {
    return {
        name: path.format(globalPath).name,
        path: globalPath,
        guts: guts,
        dom: dom
    };
}

File.prototype.hasNumber = function () {
    var hasNumber = /\d/;
    return hasNumber.test(this.guts);
}

function makeFile(globalPath, makeFileCb) {
    //read the file
    fs.readFile(globalPath, function (err, guts) {
        var file, dom;
        if (err) {
            makeFileCb(err)
            return;
        }

        //parse in to dom if we can
        dom = parseTheDom(guts);

        file = new File(globalPath, guts, dom)

        makeFileCb(null, file);
    });
}


function Dir(globalPath, arrOfDirs, arrOfFiles) {
    //getlist of contents

    return {
        name: path.format(globalPath).name,
        path: globalPath,
        dirs: arrOfDirs,
        files: arrOfFiles
    };
}

function makeDir(globalPath, makeDirCb) {

}

function getDir(globalPath, getDirCb) {
    function aboutFile(name, cb) {
        var fullPath = path.join(globalPath, name);
        fs.stat(fullPath, function (err, statObj) {
            if (err) {
                cb(err, null);
                return;
            }

            cb(null, {
                path: fullPath,
                isDir: statObj.isDirectory()
            });
        })
    }

    fs.readdir(globalPath, function (err, dirList) {

        //make list of files and dir
        asyncLib.map(dirList, aboutFile, function (err, items) {
            if (err) {
                getDirCb(err)
                return;
            }
            var sortedItems = {
                dirs: [],
                files: []
            };

            sortedItems = items.reduce(function (acc, item) {

                if (item.isDir) {
                    acc.dirs.push(item.path)
                } else {
                    acc.files.push(item.path)
                }
                return acc;

            }, sortedItems);

            //keep files we want
            sortedItems.files = sortedItems.files.filter(function (filePath) {
                var ext = path.extname(filePath),
                    keepers = ['.html', '.xml'];
                return keepers.includes(ext);
            })

            //make the files
            asyncLib.map(sortedItems.files, makeFile, function (err, files) {
                if (err) {
                    //fix it
                    return
                }

                //make the dirs
                asyncLib.map(sortedItems.dirs, getDir, function (err, dirs) {
                    var dirOut;
                    if (err) {
                        getDirCb(err, null);
                        return;
                    }

                    dirOut = new Dir(globalPath, files, dirs);

                    getDirCb(null, dirOut);
                });
            });
        });



    });
}

function Course(globalPath, content) {
    this.content = content;
}

function indexer(globalPath, cb) {
    getDir(globalPath, function (err, dir) {
        if (err) return cb(err);
        cb(null, dir);
    });
}

function makeCourse(globalPath, makeCourseCb) {

    indexer(globalPath, function (err, content) {
        course = new Course(globalPath, content)

        makeCourseCb(null, course);
    })


}


console.log(new Course('.'))
